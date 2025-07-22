import { CalendarDays, CircleDollarSign, Send, Users } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

function InfoSection ({trip}) {
  return (
    <div> 
      <img 
        src="/placeholder.jpeg"
        className='h-[340px] w-full object-cover rounded-xl'
        alt="" 
      />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip.userSelection?.location?.label}</h2>
          <div className='flex gap-5 my-2'>
            <div className='flex gap-1 p-2 px-3 bg-gray-200 rounded-full text-gray-500 '>
              <CalendarDays />
              <h2>{trip.userSelection?.days} Days</h2>
            </div>

            <div className='flex gap-1 p-2 px-3 bg-gray-200 rounded-full text-gray-500'>
              <CircleDollarSign />
              <h2>{trip.userSelection?.budget} Budget</h2>
            </div>

            <div className='flex gap-1 p-2 px-3 bg-gray-200 rounded-full text-gray-500'>
              <Users />
              <h2>No. Of Traveler: {trip.userSelection?.traveler}</h2>
            </div>
            
          </div>
        </div>

        <Button className='mt-8 ml-5 md:ml-0'>
          <Send />
        </Button>
      </div>

    </div>
  )
}

export default InfoSection