import { User } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { use, useContext } from 'react'
import { UserContext } from '../lib/context'

export default function Navbar() {
  const { user, username } = useContext(UserContext)

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/'>
            <button className='btn-logo'>Feed</button>
          </Link>
        </li>

        {user && (
          <>
            <li className='push-left'>
              <Link href='/admin'>
                <button className='btn-blue'>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image src={user?.photoURL} alt='User avatar' width={30} height={30} priority={false} />
              </Link>
            </li>
          </>
        )}

        {!user && (
          <>
            <li>
              <Link href='/login'>
                <button className='btn-blue'>Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
