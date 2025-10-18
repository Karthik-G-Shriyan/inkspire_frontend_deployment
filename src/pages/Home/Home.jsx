import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import PostDisplay from '../../components/PostDisplay/PostDisplay';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div>
        
        <Hero/>
        <PostDisplay/>
        <Footer/>
    </div>
  )
}

export default Home