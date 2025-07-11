export const SelectTravelerList =[
  {
    id: 1,
    title: 'Solo',
    description: 'Traveling alone',
    icon: '👤',
    people: '1 people',
  },
  {
    id: 2,
    title: 'Couple',
    description: 'Traveling with a partner',
    icon: '❤️',
    people: '2 people',
  },
  {
    id: 3,
    title: 'Family',
    description: 'Traveling with family members',
    icon: '👨‍👩‍👧‍👦',
    people: '3-5 people',
  },
  {
    id: 4,
    title: 'Friends',
    description: 'Traveling with friends',
    icon: '👯‍♂️',
    people: '5-10 people',
  }
]

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Low Budget',
    description: 'Affordable options',
    icon: '💰',
    budget: '$',
  },
  {
    id: 2,
    title: 'Mid Range',
    description: 'Moderate spending',
    icon: '💵',
    budget: '$$',
  },
  {
    id: 3,
    title: 'High End',
    description: 'Luxury experiences',
    icon: '💎',
    budget: '$$$',
  }
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, For {totalDays} days for {traveler} with a {budget}, give me Hotels option list with HotelName, HotelAddress, Price, hotel image URL, Geo coordinates, rating, descriptions and suggest itinerary with PlaceName, Place Details, Place Image URL, Geo coordinate, ticket pricing, Time to travel each of the location for {totalDays} days with each day planned with best time to visit in JSON format'