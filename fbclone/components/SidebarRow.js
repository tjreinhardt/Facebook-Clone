import React from 'react'
import Image from 'next/image'

function SidebarRow({ src, Icon, title }) {
  return (
    <div>
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {Icon && (
        <Icon className="h-8 w-8 text-blue-500" />
      )}
      <p className='p-2 mt-5 max-w-[600px] xl:min-w-[300px]'>
        {title}
      </p>
    </div>
  )
}

export default SidebarRow
