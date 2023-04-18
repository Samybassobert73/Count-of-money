import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';

export default function Footercw() {
  return (
    <div className=' flex-col sm:flex-row mt-40 p-10 border-solid border-t border-grey-600 flex text-footerLink '>
      <div className='flex flex-col grow justify-between'>
        <span className='font-bold text-brandName mb-10'>The count of <span className="text-violet-500" >money</span></span>
        <div>
            <div className='mb-4 text-gray-400'>
                <span className='m-2'><FontAwesomeIcon icon={faTwitter}/></span>
                <span className='m-2'><FontAwesomeIcon icon={faInstagram}/></span>
                <span className='m-2'><FontAwesomeIcon icon={faFacebook}/></span>
                <span className='m-2'><FontAwesomeIcon icon={faYoutube}/></span>
            </div>
            <span className='m-2  text-gray-400'>2022 The count of money. All rights reserved by team ❤️</span>
        </div>
      </div>
      <div className='flex flex-col w-1/5 '>
        <span className='font-medium  text-footerTitle mb-4'>About us</span>
        <a href="" className='mb-2'>About</a>
        <a href="" className='mb-2'>Career</a>
        <a href="" className='mb-2'>Blog</a>
        <a href="" className='mb-2' >Legal & privacy</a>
      </div>
      <div className='flex flex-col w-1/5'>
        <span className='font-medium text-footerTitle mb-4'>Services</span>
        <a href="" className='mb-2'>Applications</a>
        <a href="" className='mb-2'>Buy Crypto</a>
        <a href="" className='mb-2'>Affiliate</a>
        <a href="" className='mb-2' >Institutional Services</a>
      </div>
      <div className='flex flex-col w-1/5'>
        <span className='font-medium text-footerTitle mb-4'>Learn</span>
        <a href="" className='mb-2'>What is cryptocurrency</a>
        <a href="" className='mb-2'>Crypto Basic</a>
        <a href="" className='mb-2'>Tips and tutorials</a>
        <a href="" className='mb-2' >Market Update</a>
      </div>
    </div>
  )
}
