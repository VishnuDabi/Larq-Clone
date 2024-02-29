import React, { useState } from "react";
import "./cart.css";
import { IoClose } from "react-icons/io5";
import { LuTag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../Redux/features/counter/cartSlice";
const CartPage = ({ props, fun }) => {
  const [hovered, setHovered] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.items);
  const payableAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  // console.log(cartItems);
  const handleDeleteProduct = (item) => {
    // console.log(item);
    dispatch(removeItem(item));
  };
  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };
  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  return (
    <div
      className={
        props ? "active-checkout-main-container " : "checkout-main-container"
      }
    >
      <div className="blank" onClick={fun}></div>
      <div className="checkout blue">
        <div className="close-icon">
          <IoClose onClick={fun} />
        </div>
        <h6>Your cart </h6>
        <div className="wrapper">
          <p>$10 store credit</p>
        </div>
        <div className="circle-progress">
          <div
            className="circle"
            style={
              payableAmount >= 150
                ? { background: "#153a5b" }
                : { background: "" }
            }
          ></div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={
                payableAmount < 150
                  ? { width: payableAmount }
                  : { width: "100%" }
              }
            ></div>
          </div>
        </div>
        <p>You're $150.00 away from $10 in store credit!</p>
        {cartItems.length === 0 ? (
          <div className="empty-cart-div">
            <h3>Oh, it appears your cart is empty</h3>
            <button
              className={hovered ? " btn-cart" : "btn-cart-hovered"}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => {
                setHovered(false);
              }}
            >
              SHOP LARQ
            </button>
          </div>
        ) : (
          <div>
            {cartItems.map((item, index) => {
              return (
                <div key={index}>
                  <div className="cart-items">
                    <div className="cart-items-img ">
                      <img className="img" src={item.src} alt="cart-item" />
                    </div>
                    <div className="cart-items-name">
                      <h6>{item.h5}</h6>

                      <span>{item.cap}</span>
                      <span>{item.bottleSize}</span>
                      <br />
                      <span className="quantity-btn">
                        <button
                          className="decreament-btn"
                          onClick={() => handleDecreaseQuantity(item)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.totalQuantities}
                          readOnly
                        />
                        <button
                          className="increament-btn"
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          +
                        </button>
                      </span>
                    </div>
                    <div className="cart-items-div">
                      <span>
                        <AiTwotoneDelete
                          onClick={() => handleDeleteProduct(item)}
                          className="icon"
                        />
                      </span>
                      <br />
                      <br />
                      <span>${item.totalPrice}</span>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
            <div className="subtotal">
              <h6>Subtotal</h6>
              <h6>${payableAmount}</h6>
            </div>
            <hr />

            <span>
              <LuTag className="blue shop-tag " />
              <Link>Apply coupon code</Link>
            </span>
            <br />
            <br />
            <Link to="/checkout" onClick={fun}>
              <button
                className={hovered ? " btn-cart" : "btn-cart-hovered"}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                  setHovered(false);
                }}
              >
                Check out Now
              </button>
            </Link>
            <p>Shipping and taxes calculated at checkout.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
