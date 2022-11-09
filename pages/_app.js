import React from 'react'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import { Layout } from '../components'
import { StateContext } from '../context/StateContext'


function MyApp({ Component, pageProps }) {
  return(
    // Passing the data from the state context into each components
    <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
    </StateContext>
    
   
  )
}

export default MyApp
