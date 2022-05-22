import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../Assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../Assets/jpg/sellCategoryImage.jpg'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main>
        {
          // slider
        }
        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to={'/category/rent'}>
            <img
              alt='rentImage'
              src={rentCategoryImage}
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for rent</p>
          </Link>
          <Link to={'/category/sale'}>
            <img
              alt='sellImage'
              src={sellCategoryImage}
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
