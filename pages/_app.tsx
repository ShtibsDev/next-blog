import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { UserContext } from '../lib/context'
import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore, storage } from '../lib/firebase'
import { useEffect, useState } from 'react'
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
