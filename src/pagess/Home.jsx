import React from 'react'
import Navbar from '../compon/Navbar'
import Hero from '../compon/Hero'
import AiTools from '@/compon/AiTools'
import Testimonial from '@/compon/Testimonial'
import Plan from '@/compon/Plan'
import Footer from '@/compon/Footer'


const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <AiTools></AiTools>
    <Testimonial></Testimonial>
    <Plan></Plan>
    <Footer></Footer>
      </div>
  )
}

export default Home