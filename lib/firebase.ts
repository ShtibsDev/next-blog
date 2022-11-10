import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { collection, DocumentSnapshot, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import Post, { FirestorePost } from '../models/Post'

const firebaseConfig = {
  apiKey: 'AIzaSyCkr52kL1IaIUgzxdcAslEqQCua9D4Js2I',
  authDomain: 'next-blog-a51a2.firebaseapp.com',
  projectId: 'next-blog-a51a2',
  storageBucket: 'next-blog-a51a2.appspot.com',
  messagingSenderId: '1065014358194',
  appId: '1:1065014358194:web:e4a46980dcbcc5e74a59ab',
  measurementId: 'G-KRTE0Z3FCS',
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth = getAuth()
export const firestore = getFirestore()
export const storage = getStorage()
export const googleAuth = new GoogleAuthProvider()

export async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, 'users')
  const usersQuery = query(usersRef, where('username', '==', username))
  const userDoc = (await getDocs(usersQuery)).docs[0]
  return userDoc
}

export function postToJSON(doc: DocumentSnapshot): Post {
  const data = doc.data() as FirestorePost
  return {
    ...data,
    createdAt: new Date(data.createdAt.toMillis()),
    updatedAt: new Date(data.updatedAt.toMillis()),
  }
}
