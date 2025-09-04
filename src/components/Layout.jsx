import Navbar from "../components/Navbar"
import React from "react"

const Layout = ({ children }) => {
  return (
    <>
      <div className="fixed top-0 mx-auto w-full z-50">
        <Navbar />
      </div>
      <main className="pt-16">{children}</main>
    </>
  )
}

export default Layout
