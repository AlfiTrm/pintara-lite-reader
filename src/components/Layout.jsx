import Navbar from "../components/Navbar"
import React from "react"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <>
      <div className="fixed top-0 mx-auto w-full z-50">
        <Navbar />
      </div>
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
