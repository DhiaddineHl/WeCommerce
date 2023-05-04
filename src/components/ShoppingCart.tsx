import React, { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import StoreItems from "../data/items.json";
import axios from "axios";

interface ShoppingCartProps {
  isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const [total, setTotal] = useState(0);
  const { closeCart, cartItems, cartQuantity } = useShoppingCart();

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      cartItems.forEach((cartItem) => {
        const item = StoreItems.find((i) => i.id === cartItem.id);
        totalPrice += (item?.price || 0) * cartItem.quantity;
      });
      setTotal(totalPrice);
    };
    calculateTotal();
  }, [cartItems]);

  const handlePayNow = () => {
    axios
      .post(
        "/api/v1/payment/create",
        {
          beneficiaryId: "4",
          total: total,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJheml6QGdtYWlsLmNvbSIsImlhdCI6MTY4MzE5MTk5NSwiZXhwIjoxNjgzMjYwMzk1fQ.LkjlAKvvQvODYv0AtNGDT7lUes54J-BOxoD9HlYRpVE",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item}></CartItem>
          ))}

          {cartQuantity > 0 && (
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = StoreItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          )}
          {cartQuantity === 0 && <span>The cart is currently empty</span>}
          {cartQuantity > 0 && (
            <button onClick={handlePayNow} className="btn btn-success">
              Pay now
            </button>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
