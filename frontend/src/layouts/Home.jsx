import React from 'react'
import Hero from './Hero'
import FeaturedServices from './FeaturedServices'
import About from './About'
import Stats from './Stats'
import Services from './Services'

export default function Home() {
  return (
   <div>
       <Hero />
       <FeaturedServices />
       <About />
       <Stats />
       <Services />
   </div>
  )
}
