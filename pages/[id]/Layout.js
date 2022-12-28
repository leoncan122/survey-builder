import React from 'react'
import Header from '../../components/Header'

export const Layout = ({children}) => {
  return (
    <>
    <Header />
    <main>{children}</main>
    </>
  )
}
