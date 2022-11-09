import React from 'react';
import {client} from '../lib/client';
import { Products, FooterBanner, HeroBanner } from '../components';


const Home = ({products, bannerData}) => 
   (
    <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
  

    <div className='products-heading'> 
      <h2> Best Selling Products</h2>
      <p>Speakers of many variation</p>
    </div>

    <div className='products-container'> 
      {products?.map((product)=> <Products key={product._id}
        product={product}/>)}
    </div>
 

   <FooterBanner 
   footerBanner = {bannerData && bannerData[0]}
   />
    </> 
  )
 



//                    NEXT.js
//Query the API for the product and banner with Next.js
export const getServerSideProps = async () => {
  //getting all the product type from the API url and saving it into query
  const query = '*[_type == "product"]';
  //using await client.FETCH to fetch the products
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
// the return will be in the form of an props object, we then pass the object in the home function parameter
  return {
    props: { products, bannerData }
  }
}
export default Home