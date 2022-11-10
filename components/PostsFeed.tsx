import Link from 'next/link'
import { calculateMinutesToRead, getWordCount } from '../utils/helperFuncitons'
import Post from '../models/Post'

interface PostsFeedProps {
  posts: Post[]
  isAdmin: boolean
}

interface PostItemProps {
  post: Post
  isAdmin: boolean
}

export default function PostsFeed({ posts, isAdmin = false }: PostsFeedProps) {
  return (
    <>
      {posts ? (
        posts.map((post) => <PostItem post={post} key={post.slug} isAdmin={isAdmin} />)
      ) : (
        <h1>No posts published yet...</h1>
      )}
    </>
  )
}

function PostItem({ post, isAdmin = false }: PostItemProps) {
  const wordCount = getWordCount(post?.content)
  const minutesToRead = calculateMinutesToRead(wordCount)

  return (
    <div className='card'>
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min to read.
        </span>
        <span>👍 {post.likeCount} Likes</span>
      </footer>
    </div>
  )
}
