import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {useState} from 'react'
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelerList } from '@/constants/options';
import {Button} from '@/components/ui/button';
import { Plane } from 'lucide-react'
import { MapPinHouse } from 'lucide-react'
import { CalendarDays } from 'lucide-react'
import { CircleDollarSign } from 'lucide-react'
import { BookUser } from 'lucide-react'


function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([ ]);
  
  return (
    <>
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'> 
        <div className='flex items-center gap-2'>
          <Plane className='text-xl'/>
          <h2 className='text-3xl font-bold'>Tell Us Your Travel Preference</h2>
        </div>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic infomration and the trip planner will generate a customized itineary based on your preferences.</p>

        <div className='mt-15 flex flex-col gap-9'>
          <div>
            <div className='flex items-center gap-2'>
              <MapPinHouse className='text-xl'/>
              <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
            </div>
            
            <GooglePlacesAutocomplete 
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {setPlace(v);console.log(v)}
              }}
            />
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <CalendarDays />
              <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
            </div>
            <Input placeholder={'Ex.3'} type="number"/>
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 mt-3'>
            <CircleDollarSign />
            <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          </div>
          
          <div className='grid grid-cols-3 gap-5'>
            {SelectBudgetOptions.map((item,index) =>(
              <div key={index} className='p-4 border rounded-lg hover:shadow-xl cursor-pointer'>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-600'>{item.description}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 mt-3'>
            <BookUser className='text-xl' />
            <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with in your adventure?</h2>
          </div>

          <div className='grid grid-cols-4 gap-5'>
            {SelectTravelerList.map((item,index) =>(
              <div key={index} className='p-4 border rounded-lg hover:shadow-xl cursor-pointer'>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-600'>{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
        
        <div className='my-10 flex justify-end'>
          <Button>
            Generate
          </Button>
        </div>
        
      </div>
    </>
  )
}

export default CreateTrip