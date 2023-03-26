import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import formatCurrency from '../utilities/formatCurrency'
import CartItem from './CartItem'
import StoreItems from '../data/items.json'

interface ShoppingCartProps {
    isOpen : boolean
}

const ShoppingCart = ({isOpen} : ShoppingCartProps) => {

    const {closeCart, cartItems, cartQuantity} = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                Cart
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} ></CartItem>
                ))}
                {cartQuantity > 0 && <div className="ms-auto fw-bold fs-5">
                    Total{" "}
                    {
                        formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = StoreItems.find(i => i.id ===cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )
                    }
                </div>}
                {cartQuantity === 0 && <span>The cart is currently empty</span>}
                {cartQuantity > 0 &&<button className="btn btn-success">Pay now</button>}
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart