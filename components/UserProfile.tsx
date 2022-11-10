import Image from 'next/image'
import BlogUser from '../models/BlogUser'

interface UserProfileProps {
  user: BlogUser
}

export default function UserProfile({ user }: UserProfileProps) {
  console.log(user)
  return (
    <div className='box-center'>
      <Image src={user.photoURL} width={230} height={150} className='card-img-center' alt='User Avatar' />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  )
}
