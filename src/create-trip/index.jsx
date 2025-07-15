import React, { useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {useState} from 'react'
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelerList } from '@/constants/options';
import {Button} from '@/components/ui/button';
import { Plane } from 'lucide-react'
import { MapPinHouse } from 'lucide-react'
import { CalendarDays } from 'lucide-react'
import { CircleDollarSign } from 'lucide-react'
import { BookUser } from 'lucide-react'
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';



function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([ ]);

  const [openDialog, setOpenDialog] = useState(false);

  //name(eg. location, days, budget) value(eg. Paris, numberofpeople)
  const handleInputChange = (name,value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    console.log('Form Data:', formData);
    // You can also send this data to your backend or perform any other action
  },[formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google login success:", codeResp);
      GetUserProfile(codeResp);  // ✅ Fetch user data and store
    },
    onError: (error) => console.log("Google login error", error),
  });


  const OnGenerateTrip =async () => {

    const user = localStorage.getItem('user');

    if(!user) {
      setOpenDialog(true);
      return;
    }

    if(formData?.days > 5 && !formData?.location || !formData?.budget || !formData?.traveler)
    {
      toast("Please fill in all details!")
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
    .replace('{location', formData?.location?.label)
    .replace('{totalDays}', formData?.days)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.days);

    console.log('Final Prompt:', FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log('AI Response:', result);
  }

  const SaveAiTrip = async (TripData) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: TripData,
        createdAt: new Date().toISOString(), 
});
  }

  const GetUserProfile=(tokenInfo) => {
    axios.get(`https:www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept:`application/json`
    }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }
  
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
                onChange: (v) => {setPlace(v); handleInputChange('location', v);},
              }}
            />
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <CalendarDays />
              <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
            </div>
            <Input placeholder={'Ex.3'} type="number"
              onChange={(e) => handleInputChange('days', e.target.value)}
            
            />
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 mt-3'>
            <CircleDollarSign />
            <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          </div>
          
          <div className='grid grid-cols-3 gap-5'>
            {SelectBudgetOptions.map((item,index) =>(
              <div key={index} 
                onClick={() => handleInputChange('budget', item.title)}
                className={`
                  p-4 border rounded-lg hover:shadow-xl cursor-pointer
                  ${formData?.budget == item.title && 'shadow-xl border-black'}
                `}>
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
              <div key={index} 
                onClick={() => handleInputChange('traveler', item.people)}
                className={`
                p-4 border rounded-lg hover:shadow-xl cursor-pointer
                ${formData?.traveler == item.people && 'shadow-xl border-black'}
                `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-600'>{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
        
        <div className='my-10 flex justify-end'>
          <Button onClick={OnGenerateTrip}>
            Generate
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="sr-only">Google Sign In Dialog</DialogTitle>
              <DialogDescription asChild>
                <div>
                  <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
                  <p>Sign in to the App with Google Authentication securely.</p>
                  <Button 
                    className='mt-5 w-full text-white flex gap-4 items-center'
                    onClick={login}
                  >
                    <FcGoogle className='h-7 w-7'/>
                    Sign in with Google
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
      </div>
    </>
  )
}

export default CreateTrip