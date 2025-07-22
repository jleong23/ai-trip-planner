import React from 'react'
import { LocationEdit } from 'lucide-react'

function Hotels({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {trip?.tripData?.hotelOptions?.map((hotel, index) => {
          console.log("Hotel object:", hotel); // <-- Add this

          return (
            <div key={index}>
              <img src="/placeholder.jpeg" className='rounded-xl' alt="" />
              <div className='my-2'>
                <h2 className='font-bold'>{hotel.hotelName}</h2>
                <h2 className='text-xs flex gap-2'><LocationEdit />{hotel.hotelAddress}</h2>
                <h2 className='text-sm'>{hotel.pricePerNight}</h2>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default Hotels