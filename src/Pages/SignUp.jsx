import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../Assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../Assets/svg/visibilityIcon.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { db } from '../Firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import GoogleOAuth from '../Components/GoogleOAuth'

function SignUp() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = formData

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredentials.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              className='nameInput'
              type={'text'}
              placeholder='Name'
              value={name}
              onChange={onChange}
              id='name'
            />
            <input
              className='emailInput'
              type={'email'}
              placeholder='Email'
              value={email}
              onChange={onChange}
              id='email'
            />
            <div className='passwordInputDiv'>
              <input
                className='passwordInput'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={onChange}
                id='password'
              />
              <img
                src={visibilityIcon}
                alt='showPassword'
                onClick={() => setShowPassword((prev) => !prev)}
                className='showPassword'
              />
            </div>
            <Link to={'/forgotPassword'} className='forgotPasswordLink'>
              Forgot Password
            </Link>
            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton' type='submit'>
                <ArrowRightIcon fill='#ffffff' width={34} height={34} />
              </button>
            </div>
          </form>
          <GoogleOAuth />
          <Link to={'/sign-in'} className='registerLink'>
            Sign In Instead...
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp
