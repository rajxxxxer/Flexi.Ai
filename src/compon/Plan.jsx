import { PricingTable } from '@clerk/clerk-react'
import React from 'react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
      <div className='text-center'><h2 className='text-[42px] text-slate-700 font-bold '>Choose Your Plan</h2>
      <p className='text-gray-600 max-w-lg mx-auto'>Start for free, scale and build. Select the plan that best fits your needs.</p></div>
      <div className='mt-14 max-sm:mx-8'><PricingTable></PricingTable></div>
    </div>
  )
}

export default Plan