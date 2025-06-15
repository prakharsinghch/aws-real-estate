import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'

const FooterSection = () => {
  return (
   <footer
    className='border-t border-gray-200 py-20'
   >
    <div className='max-w-4xl mx-auto px-6 sm:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-4'>
                <Link href="/" className='text-xl font-bold' scroll={false}>RENTIFUL</Link>    
            </div>
            <nav className='mb-4'>
                <ul className='flex space-x-6'>
                    <li>
                        <Link href="/about" className='text-gray-600 hover:text-gray-900' scroll={false}>About Us</Link>
                    </li>
                    <li>
                        <Link href="/contact" className='text-gray-600 hover:text-gray-900' scroll={false}>Contact Us</Link>
                    </li>
                    <li>
                        <Link href="/faq" className='text-gray-600 hover:text-gray-900' scroll={false}>FAQ</Link>
                    </li>
                    <li>
                        <Link href="/terms" className='text-gray-600 hover:text-gray-900' scroll={false}>Terms</Link>
                    </li>
                    <li>
                        <Link href="/privacy" className='text-gray-600 hover:text-gray-900' scroll={false}>Privacy</Link>
                    </li>
                </ul>
            </nav>
            <div className='flex space-x-4 mb-4'>
                <a href="#" aria-label='facebook' className='hover:text-primary-600'>  
                    <FontAwesomeIcon icon={faFacebook}  className="h-6 w-6"/>
                </a>
                <a href="#" aria-label='instagram' className='hover:text-primary-600'>  
                    <FontAwesomeIcon icon={faInstagram}  className="h-6 w-6"/>
                </a>
                <a href="#" aria-label='twitter' className='hover:text-primary-600'>  
                    <FontAwesomeIcon icon={faTwitter}  className="h-6 w-6"/>
                </a>
                <a href="#" aria-label='linkedIn' className='hover:text-primary-600'>  
                    <FontAwesomeIcon icon={faLinkedin}  className="h-6 w-6"/>
                </a>
                <a href="#" aria-label='youtube' className='hover:text-primary-600'>  
                    <FontAwesomeIcon icon={faYoutube}  className="h-6 w-6"/>
                </a>
            </div>
        </div>
        <div className='mt-8 text-center text-sm text-gray-500 flex justify-center space-x-4'>
                <span>© RENTIful 2025</span>
        </div>
    </div>

   </footer>
  )
}

export default FooterSection