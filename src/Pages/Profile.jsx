import React, { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../Firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../Assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../Assets/svg/homeIcon.svg'
import ListingItem from '../Components/ListingItem'

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [change, setChange] = useState(false)
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
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

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listing.filter(
        (listing) => listing.id !== listingId
      )
      setListing(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      const listing = []

      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListing(listing)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

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
              value={name || ''}
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
        <Link to={'/create-listing'} className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img alt='arrow-right' src={arrowRight} />
        </Link>

        {!loading && listing.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listing.map((listing, index) => (
                <ListingItem
                  key={index}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
