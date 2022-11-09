import React, { useState } from 'react'
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import {client, urlFor} from '../../lib/client'
import { Products } from '../../components'
import { useStateContext } from '../../context/StateContext'


const ProductDetails = ({product, products}) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const {decQty, incQty, qty, onAdd} = useStateContext();

  return (
    <div>
        <div className='product-detail-container'>
          <div>
            <div className='image-container'>
                <img src={urlFor(image && image[index])} className='product-detail-image'/>
            </div>
            <div className='small-images-container'>
                {image?.map((item, i)=>(
                    <img key={i}
                    src={urlFor(item)}
                    className={i === index ?
                    'small-image selected-image' :
                    'small-image'}
                    onMouseEnter={()=> setIndex(i)}
                    />
                ))}

            </div>
          </div>
          <div class="product-detail-desc">
            <h1>{name}</h1>
            <div className='reviews'>
                <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                </div>
                <p>
                    (20)
                </p>
            </div>
            <h4>Details: </h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            <div className='quantity'>
                <h3>Quantity: </h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                    <span className='num' onClick=''>{qty}</span>
                    <span className='plus' onClick={incQty}><AiOutlinePlus/></span>

                </p>
            </div>
            <div className='buttons'>
                <button type ="button" className='add-to-cart' onClick={()=> onAdd(product, qty)}>Add to cart</button>
                <button type="button" className='buy-now' onClick="">Buy Now</button>
            </div>
          </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>Recommended Products</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item)=>(
                        <Products 
                          key = {item._id}
                          product={item}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
// when using getStaticProps for server side rendering, we must not forget to use 
// the getStaticPath because we want to pre-render the pages that uses dynamic routes, i.e
// when the user clicks on a product to buy it should dynamically go to the next page and re-render the page with all related
//products there
export const getStaticPaths = async () =>{
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product)=>({
        params:{
            slug: product.slug.current
        }
    }));

    return{
        paths,
        fallback: 'blocking'
    }
}

//                  NEXTjs
//Query the API for the product and similar products with Next.js
export const getStaticProps = async ({params:{slug}}) => {
  //getting all the product type from a particular click from the API url and saving it into query
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  //using await client.FETCH to fetch the products
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery)

// the return will be in the form of an props object, we then pass the object in the home function parameter
  return {
    props: { products, product }
  }
}
export default ProductDetails