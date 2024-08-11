import React from 'react'
import Navbar from './components/navbar/Navbar'
import Carousel from './components/carousel/Carousel'
import Homepage from './components/homepage/Homepage'
// import { Home } from '@mui/icons-material'



const page = () => {
  return (
    <div>
      <Navbar/>
      {/* <ResponsiveAppBar/> */}
      <Carousel/>
      <Homepage/>
    </div>
  )
}

export default page
