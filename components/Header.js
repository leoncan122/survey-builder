import { useRouter } from 'next/router'
import React from 'react'

const Header = () => {
  const router = useRouter()
  // console.log(router)
  return (
    
    <header className="">
    <div id="top-header" className="w-100">
      <ul className='nav '>
        <li className='nav-item'><a className='nav-link' href="/">Home</a></li>
        <li className='nav-item'><a className='nav-link' href="/mysurveys">My surveys</a></li>
        <li className='nav-item'><a className='nav-link' href="/creator">Create survey</a></li>
        <li className='nav-item'><a className='nav-link' href="/reports">Data and Reports</a></li>

      </ul>
    </div>
    <nav className="">
      <img className=""></img>
    </nav>
  </header>
  )
}

export default Header