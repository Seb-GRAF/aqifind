import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [path, setPath] = useState('/')

  useEffect(() => {
    setPath(location.pathname)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-8 max-w-[100rem] px-[5vw] py-4 mx-auto my-0 ${
        path === '/' ? 'text-white' : 'text-black'
      }`}>
      <Link href='/'>
        <a className='underline underline-offset-2'>Home</a>
      </Link>
    </nav>
  )
}
