import React from 'react'
import {Button} from '../ui/button.jsx'

const Header = () => {
  return (
    <div className='w-full p-3 shadow-sm flex justify-between items-center px-5'>
       <h1>Trip Planner</h1>
      <div>
        <Button iconSize="lg" className="text-base">
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default Header