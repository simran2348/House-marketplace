import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as BedIcon } from '../Assets/svg/bedIcon.svg'
import { ReactComponent as BathtubIcon } from '../Assets/svg/bathtubIcon.svg'
import { ReactComponent as DeleteIcon } from '../Assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../Assets/svg/editIcon.svg'

function ListingItem({ listing, id, onDelete, onEdit }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/category/${listing.type}/${id}`}
        className='categoryListingLink'
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.image}
          className='categoryListingImg'
        ></img>
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.location}</p>
          <p className='categoryListingName'>{listing.name}</p>
          <p className='categoryListingPrice'>
            &#8377;
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className='categoryListingInfoDiv'>
            <BedIcon />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
            <BathtubIcon />
            <p className='categoryListingInfoText'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231,76,60)'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
      {onEdit && (
        <EditIcon className='editIcon' onClick={() => onEdit(listing.id)} />
      )}
    </li>
  )
}

export default ListingItem
