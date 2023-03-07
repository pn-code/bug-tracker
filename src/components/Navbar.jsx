import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-4 py-6 bg-[#299e87] text-white font-semibold items-center'>
        <h1 className='text-xl'>Bug Tracker</h1>
        <ul className='flex gap-12 text-sm'>
            <Link href="">Dashboard</Link>
            <Link href="">Tasks</Link>
            <Link href="">Manage</Link>
            <Link href="">Issues</Link>
            <Link href="">Login</Link>
        </ul>
    </nav>
  )
}

export default Navbar