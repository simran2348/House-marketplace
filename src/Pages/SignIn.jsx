import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../Assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../Assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import GoogleOAuth from '../Components/GoogleOAuth'

function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

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

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredentials) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad User Credentials')
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
            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button className='signInButton' type='submit'>
                <ArrowRightIcon fill='#ffffff' width={34} height={34} />
              </button>
            </div>
          </form>
          <GoogleOAuth />
          <Link to={'/sign-up'} className='registerLink'>
            Sign Up Instead...
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignIn
