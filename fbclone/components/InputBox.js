import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid"
import { useState } from 'react'
import { useRef } from 'react'
import { storage } from '../firebase'
import { db, collection, Timestamp } from '../firebase'
import firebase from "../firebase"
// import { collection, addDoc } from 'firebase/firestore/lite'
import { setDoc } from 'firebase/firestore'

function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  // const postsCollectionRef = collection(db, 'posts');
  const [imageToPost, setImageToPost] = useState(null);

  // const uploadFile

  const sendPost = async (e) => {
    e.preventDefault()

    if (!inputRef.current.value) return;

    db.collection("posts").add({
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      // timestamp: Timestamp.fromDate(new Date("October 10, 2022"))
    }).then(doc => {
      if (imageToPost) {
        const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, "data_url")

        removeImage();

        uploadTask.on(
          "state_change",
          null,
          (error) => console.error(error),
          () => {
            storage.ref(`posts/${doc.id}`).getDownloadURL().then(url => {
              db.collection('posts').doc(doc.id).set({
                postImage: url
              }, { merge: true })
            })
          }
        )
      }
    })

    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className='flex flex-1'>
          <input
            className='rounded-full h-12 bg-gray-200 flex-grow px-5 focus:outline-none'
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>Submit</button>
        </form>


        {imageToPost && (
          <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform:scale-105 cursor-pointer" >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className='text-xs text-red-500 text-center'>Remove</p>
          </div>
        )}
      </div>

      <div className='flex justify-evenly p-3 border-t'>
        <div className='flex items-center space-x-1 hover:bg-gray-200 flex-grow justify-center p-2 rounded-xl cursor-pointer'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'> Live Video</p>
        </div>

        <div onClick={() => filepickerRef.current.click()}
          className='flex items-center space-x-1 hover:bg-gray-200 flex-grow justify-center p-2 rounded-xl cursor-pointer'>
          <CameraIcon className='h-7 text-green-400' />
          <p className='text-xs sm:text-sm xl:text-base'> Photo/Video</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type="file"
            hidden />
        </div>

        <div className='flex items-center space-x-1 hover:bg-gray-200 flex-grow justify-center p-2 rounded-xl cursor-pointer'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='text-xs sm:text-sm xl:text-base'> Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
