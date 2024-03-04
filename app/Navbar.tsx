import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  return (
    <div className='px-10 p-3 flex justify-between items-center'>
      <h3>Game</h3>
     <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default Navbar