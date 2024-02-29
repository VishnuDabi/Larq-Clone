import React, { useState } from "react";
import "./header.css";
import { CiUser } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import HoveredCard from "./HoveredCard";
import { menuData1 } from "./menuData";
import { menuData2 } from "./menuData";
import { menuData3 } from "./menuData";
import { menuData4 } from "./menuData";
import { IoIosMenu } from "react-icons/io";
import Menu from "./Menu";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Redux/features/counter/cartSlice";
import CartPage from "../Cart/CartPage";

const Header = ({ logout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [checkoutToggle, setCheckoutToggle] = useState(false);
  const [stickyCheck, setStickyCheck] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.cart.user);
  const userId = useSelector((state) => state.cart.userId);
  // console.log(user);

  const [scroll, setScroll] = useState(0);
  const dispatch = useDispatch();

  localStorage.setItem(user, "user");

  const toggleMenuHandler = () => {
    setShowMenu(!showMenu);
  };
  const checkoutToggleHandler = () => {
    setCheckoutToggle(!checkoutToggle);
  };

  const headerChangeHandler = () => {
    if (window.scrollY <= scroll) {
      setStickyCheck(true);
    } else {
      setScroll(window.scrollY);
      setStickyCheck(false);
    }
  };

  window.addEventListener("scroll", headerChangeHandler);
  return (
    <>
      <section className={stickyCheck ? "sticky-header" : ""}>
        <header className="header-container blue">
          <div className="header-wrapper">
            <div className="header-item">
              <div className="hamburger-menu-container">
                {showMenu ? (
                  <IoCloseOutline
                    className="hamburger-icon icon"
                    onClick={toggleMenuHandler}
                  />
                ) : (
                  <IoIosMenu
                    className="hamburger-icon icon"
                    onClick={toggleMenuHandler}
                  />
                )}
              </div>
              <div className="header-links ">
                <ul>
                  <li className="menu-link shop-all">
                    <span>Shop all</span>
                    <HoveredCard Props={menuData1} />
                  </li>
                  <li className="menu-link">
                    <span>purifiction</span>
                    <HoveredCard Props={menuData2} />
                  </li>
                  <li className="menu-link">
                    <span>home</span>
                    <HoveredCard Props={menuData3} />
                  </li>
                  <li className="menu-link">
                    <span>drinkware</span>
                    <HoveredCard Props={menuData4} />
                  </li>
                </ul>
              </div>
            </div>

            <div className="cmp-logo">
              <Link to="/">
                <img
                  className="img"
                  src="https://www.augmentventures.com/wp-content/uploads/2020/02/larq-logo.jpg"
                  alt=""
                />
              </Link>
            </div>
            <div className="icons-container">
              <div className="login-icons">
                <p>
                  <span>technology</span>
                  <span>faq</span>
                  <span>
                    {user != null ? (
                      <button
                        className="btn logout-btn"
                        onClick={() => {
                          dispatch(setLogout());
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <Link to="/login">
                        <CiUser className="icon" />
                      </Link>
                    )}
                  </span>
                  <Link>
                    <span className=" checkout-btn-number">
                      <PiShoppingCart
                        className="icon"
                        onClick={checkoutToggleHandler}
                      />
                      <span className="cart-item-number">
                        {cartItems.length}
                      </span>
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <Menu props={showMenu} />
          <CartPage props={checkoutToggle} fun={checkoutToggleHandler} />
        </header>
      </section>
    </>
  );
};

export default Header;
