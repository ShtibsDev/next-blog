import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import PostsFeed from '../../components/PostsFeed'
import UserProfile from '../../components/UserProfile'
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import BlogUser from '../../models/BlogUser'
import Post from '../../models/Post'

export async function getServerSideProps(props) {
  const { username } = props.query

  const userDoc = await getUserWithUsername(username)

  let user: BlogUser = null
  let posts: Post[] = null

  if (userDoc) {
    user = userDoc.data() as BlogUser
    const postsQuery = query(collection(userDoc.ref, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'), limit(5))
    posts = (await getDocs(postsQuery)).docs.map(postToJSON)
  }

  return { props: { user, posts } }
}

interface UserProfilePageProps {
  user: BlogUser
  posts: Post[]
}

export default function UserProfilePage({ user, posts }: UserProfilePageProps) {
  return (
    <main>
      <UserProfile user={user} />
      <PostsFeed posts={posts} isAdmin={false} />
    </main>
  )
}
