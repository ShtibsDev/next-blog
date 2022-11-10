import { doc, collection, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './firebase'

export function useUserData() {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState<string>(null)

  useEffect(() => {
    let unsubscribe: any

    if (user) {
      const ref = doc(collection(firestore, 'users'), user.uid)
      unsubscribe = onSnapshot(ref, (doc) => setUsername(doc.data()?.username))
    } else setUsername(null)

    return unsubscribe
  }, [user])

  return { user, username }
}
