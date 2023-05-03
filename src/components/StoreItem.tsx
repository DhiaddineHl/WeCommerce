import React from 'react'
import { Card } from "react-bootstrap"
import { useShoppingCart } from '../context/ShoppingCartContext'
import formatCurrency from '../utilities/formatCurrency'


interface Props {
    id : number,
    name : string,
    price : number,
    category : string,
    imgUrl : string
}

const StoreItem = ({ id, name, price, category, imgUrl} : Props) => {
    const {
        getItemQuantity,
        increaseCartquantity,
        decreaseCartquantity,
        removeFromCart  
    } = useShoppingCart()
    
    const quantity = getItemQuantity(id);
  return (
    <Card className='h-100'>
        <Card.Img variant='top' src={imgUrl} height="200px" style={
            {objectFit: "cover"}
        } />
        <Card.Body className='d-flex flex-column' >
            <Card.Title className='d-flex justify-content-between align-items-baseline mb-4' >
                <span className='fs-2'>{name}</span>
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                { quantity ===0 ? (
                    <button className='btn btn-primary w-100'
                    onClick={() => increaseCartquantity(id)}
                    >Add to cart</button>
                ) : 
                <div className="d-flex align-items-center flex-column"
                    style={{gap: ".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center"
                    style={{gap: '.5rem'}}>
                        <button className='btn btn-primary'
                        onClick={() => decreaseCartquantity(id)}
                        >-</button>
                        <div><span className="fs-3">{quantity}</span>in cart</div>
                        <button className='btn btn-primary'
                        onClick={() => increaseCartquantity(id)}
                        >+</button>
                    </div>
                    <button className="btn btn-outline-danger"
                    onClick={() => removeFromCart(id)}
                    >Clear</button>
                </div>
                }
            </div>
        </Card.Body>
    </Card>
  )
}

export default StoreItem


