import { collectionGroup, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { EXPORT_MARKER } from 'next/dist/shared/lib/constants'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import PostsFeed from '../components/PostsFeed'
import { firestore, postToJSON } from '../lib/firebase'
import Post from '../models/Post'
import styles from '../styles/Home.module.css'

const LIMIT = 1

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  )
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON)

  return { props: { posts } }
}

interface HomeProps {
  posts: Post[]
}

export default function Home(props: HomeProps) {
  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)
  const [postEnd, setPostEnd] = useState(false)

  return (
    <main>
      <PostsFeed posts={posts} isAdmin={false} />
    </main>
  )
}
