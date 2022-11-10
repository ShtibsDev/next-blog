import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, writeBatch, WriteBatch } from 'firebase/firestore'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../lib/context'
import { auth, firestore, googleAuth } from '../lib/firebase'
import { useUserData } from '../lib/hooks'
import debounce from 'lodash.debounce'

export default function LoginPage({}) {
  const { user, username } = useContext(UserContext)
  return <main>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</main>
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuth)
  }

  return (
    <button className='btn-google' onClick={signInWithGoogle}>
      <Image src={'/google.png'} alt='Google Logo' width={30} height={30} /> Sign in with Google
    </button>
  )
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user, username } = useUserData()

  useEffect(() => {
    checkUserName(formValue)
  }, [formValue])

  const checkUserName = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(firestore, `usernames`, username)
        const myDoc = await getDoc(ref)
        setIsValid(!myDoc.exists())
        setIsLoading(false)
      }
    }, 500),
    []
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    if (value.length < 3) {
      setFormValue(value)
      setIsLoading(false)
      setIsValid(false)
    }

    if (regex.test(value)) {
      setFormValue(value)
      setIsLoading(true)
      setIsValid(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const userDoc = doc(firestore, 'users', user.uid)
    const usernameDoc = doc(firestore, 'usernames', formValue)

    const batch = writeBatch(firestore)
    batch.set(userDoc, { username: formValue, displayName: user.displayName, email: user.email, photoURL: user.photoURL, phoneNumber: user.phoneNumber })
    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit()
  }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={handleSubmit}>
          <input type='text' value={formValue} placeholder='username' onChange={handleChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={isLoading} />
          <button type='submit' className='btn-green' disabled={!isValid}>
            Choose
          </button>
        </form>
      </section>
    )
  )
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p className='text-success'>{username} is available!</p>
  } else if (username && !isValid) {
    return <p className='text-danger'>That username is taken!</p>
  } else {
    return <p></p>
  }
}
