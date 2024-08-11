import React from 'react'
import Navbar from './components/navbar/Navbar'
import Carousel from './components/carousel/Carousel'
import Homepage from './components/homepage/Homepage'
import Footer from './components/footer/Footer'
// import { Home } from '@mui/icons-material'



const page = () => {
  return (
    <div>
      <Navbar/>
      {/* <ResponsiveAppBar/> */}
      <Carousel/>
      <Homepage/>
      <Footer/>
    </div>
  )
}

export default page
