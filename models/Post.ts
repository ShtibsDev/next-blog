import { Timestamp } from 'firebase/firestore'

export default interface Post {
  content: string
  likeCount: number
  published: boolean
  slug: string
  title: string
  uid: string
  username: string
  createdAt: Date
  updatedAt: Date
}

export interface FirestorePost {
  content: string
  likeCount: number
  published: boolean
  slug: string
  title: string
  uid: string
  username: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
