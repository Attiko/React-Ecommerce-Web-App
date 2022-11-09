import React, { createContext, useContext, useState, useEffect, Children } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext()

export const StateContext = ({children}) => {
const [showCart, setShowCart] = useState(false);
const [cartItems, setCartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState();
const [totalQuantities, setTotalQuantities] = useState(0);
const [qty, setQty] = useState(1);

//implementing the add items to cart
const onAdd = (product, quantity) => {
    //checking if the product is in cart, by looping through the individual cart items with .find() and check if the item id is equal to the product id
    const checkProductInCart = cartItems.find((item)=> item._id === product._id)
    //if yes then we call the setTotalPrice() and pass the prevTotalPrice as parameter, adding it to the new product price and multiply by the quantity
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if(checkProductInCart){
    //This part handles the cart items by mapping through the individual cart products and checks if the cart is the same as the one inside the cart
    //if its equal it returns a new spread object and increases the cart product quantity by the new quantity
        const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return{
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
        })
        setCartItems(updatedCartItems);
    } else{
        product.quantity = quantity;
        setCartItems([...cartItems],{ ...product })
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
}



// implementing the increase  and decrease button
const incQty = () =>{
    setQty((prevQty)=>prevQty + 1)
}
//checking if the number is less than one so it doesn't descend further
const decQty = () =>{
    setQty((prevQty) =>{
        if(prevQty - 1 < 1)return 1;

        return prevQty - 1      
    });
}
return (
<Context.Provider
value={{
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    incQty,
    decQty,
    onAdd
}}
>
{children}
</Context.Provider>
)

}
// Creating a special function to export the use state context, so we can use it as a HOOK
export const useStateContext = () => useContext(Context);