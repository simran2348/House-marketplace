import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase.config'
import { toast } from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [change, setChange] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
        toast.success('Profile updated')
      }
    } catch (error) {
      toast.error('Could not update profile')
    }
  }

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const { name, email } = formData

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              change && onSubmit()
              setChange((prev) => !prev)
            }}
          >
            {change ? 'done' : 'change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type={'text'}
              id='name'
              className={!change ? 'profileName' : 'profileNameActive'}
              disabled={!change}
              value={name}
              onChange={onChange}
            />
            <input
              type={'text'}
              id='email'
              className={!change ? 'profileEmail' : 'profileEmailActive'}
              disabled
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile
