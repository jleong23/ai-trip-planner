import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { toast } from 'sonner';

function ViewTrip() {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);

  useEffect(() => {
    tripId&&GetTripData();
  }, [tripId]);

  /**
   * Used to get Trip info from FireBase
   */
  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    }
    else {
      console.log("No such document!");
      toast("No trip Found!");
    }
  } 
  return (
    <div>
      {/* Information Section  */}

      {/* Recommended Hotels */}

      {/* Daily Plan */}

      {/* Footer */}
    </div>
  )
}

export default ViewTrip