import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
  return (
    <>
      <div 
        className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'
        > 
        <h2 className='text-3xl font-bold'>Tell us Your Travel preference</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic infomration and the trip planner will generate a customized itineary based on your preferences.</p>

        <div className='mt-15'>
          <div>
            <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
            <GooglePlacesAutocomplete 
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            />
          </div>
        </div>
      </div>

    </>
  )
}

export default CreateTrip