import React from 'react'
import Image from 'next/image'
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";

import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";



function Header() {
  return (
    <div>
      <h1>Header</h1>

      {/* Header Left */}

      <div className='flex items-center'>
        <Image
          src={'https://links.papareact.com/5me'}
          width={40}
          height={40}
          layout='fixed'
        />
        <div className='flex ml-2 items-center rounded-full'>
          <SearchIcon className="h-6 text-gray-600" />
          <input type="text" placeholder='Search Facebook' />
        </div>
      </div>

      {/* Header Center */}

      {/* Header Right */}

    </div>

  )
}

export default Header
