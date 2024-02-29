import React, { useEffect, useState } from "react";
import "./buy-product.css";
import { data as localData } from "../Trending/data";
import { useParams } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/features/counter/cartSlice";
const BuyProduct = () => {
  const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart.items);
  const { targetIndex } = useParams();
  const [insulatedType, setInsulatedType] = useState(true);
  const [data, setData] = useState({});
  const [imgScaler, setImgScaler] = useState(false);
  const [bottleSize, setBottleSize] = useState("23 oz");
  useEffect(() => {
    console.log(localData);
    if (Object.keys(data).length && !insulatedType) {
      // console.log(localData[index]);
      // alert("changing ");
      // localData[targetIndex] = data;
    }
    console.log(data);
  });
  useEffect(() => {
    localData.forEach((value, index) => {
      if (index === Number(targetIndex)) {
        if (insulatedType) {
          setData(value);
        } else {
          // if (Object.keys(data).length) {
          //   console.log(localData[index]);
          //   localData[index].nonInsulated = data;
          // }
          setData(value.nonInsulated);
        }
      }
    });
  }, [targetIndex, insulatedType]);
  function imgHandler(value, name, rs, grossAmount) {
    // console.log(value);

    data.src = value;
    if (grossAmount) {
      setData({
        ...data,
        src: value,
        cap: name,
        rs: rs,
        grossAmount: grossAmount,
      });
      if (insulatedType) {
        localData[targetIndex] = {
          ...localData[targetIndex],
          src: value,
          cap: name,
          rs: rs,
          grossAmount: grossAmount,
        };
      } else {
        localData[targetIndex].nonInsulated = {
          ...localData[targetIndex].nonInsulated,
          src: value,
          cap: name,
          rs: rs,
          grossAmount: grossAmount,
        };
      }
    } else {
      setData({
        ...data,
        src: value,
        cap: name,
        rs: rs,
      });
      if (insulatedType) {
        localData[targetIndex] = {
          ...localData[targetIndex],
          src: value,
          cap: name,
          rs: rs,
        };
      } else {
        localData[targetIndex].nonInsulated = {
          ...localData[targetIndex].nonInsulated,
          src: value,
          cap: name,
          rs: rs,
        };
      }
    }
  }
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  // console.log(cartItems);

  return (
    <section className="cart-container">
      <div className="cart-wrapper">
        <div className=" cart-item">
          <div className="cart-img-container ">
            <img
              src={data.src}
              alt=""
              className={imgScaler ? " img-scale" : ""}
            />
          </div>
        </div>
        <div className="cart-item-detail-container cart-item">
          <h3>{data.h5}</h3>
          <h4>
            {data.grossAmount ? (
              <em className="gross-amount">${data.grossAmount + "  "}</em>
            ) : null}
            ${data.rs}
          </h4>
          ⭐⭐⭐⭐6356 reviews
          <br />
          {data.nonInsulated ? (
            <>
              <span>Insulation</span>
              <br />
              <div className="button insulated__btn">
                <input
                  type="radio"
                  id="insulated"
                  name="insulation-type"
                  onChange={() => setInsulatedType(true)}
                  checked={insulatedType}
                />
                <label className=" btn-default" htmlFor="insulated">
                  <div className="insulated__container">
                    <h6 className="insulated__text">Insulated</h6>
                    <span className="insulated__text">
                      24 hours cold or 12 hours hot
                    </span>
                  </div>
                </label>
              </div>
              <div className="button insulated__btn">
                <input
                  type="radio"
                  id="non-insulated"
                  name="insulation-type"
                  checked={!insulatedType}
                  onChange={() => setInsulatedType(false)}
                />
                <label className=" btn-default" htmlFor="non-insulated">
                  <div className="insulated__container">
                    <h6 className="insulated__text">Non-Insulated</h6>
                    <span className="insulated__text">Light as Air</span>
                  </div>
                </label>
              </div>
            </>
          ) : null}
          <br />
          <span>Size</span>
          <br />
          <div className="button">
            <input
              type="radio"
              id="23-oz"
              name="size"
              value="23 oz"
              checked={!imgScaler}
              onChange={(event) => {
                setImgScaler(false);
                setBottleSize(event.target.value);
              }}
            />
            <label className=" btn-default" htmlFor="23-oz">
              23 oz
            </label>
          </div>
          <div className="button">
            <input
              checked={imgScaler}
              type="radio"
              id="34-oz"
              name="size"
              value="34 oz"
              onChange={(event) => {
                setImgScaler(true);
                setBottleSize(event.target.value);
              }}
            />
            <label className=" btn-default" htmlFor="34-oz">
              34 oz
            </label>
          </div>
          {data.cap === ("23 oz" || "34 oz") ? null : (
            <>
              <span>{data.cap}</span>
              <br />

              <div className="radio-option">
                {data.option ? (
                  <>
                    {data.option.map((value, index) => {
                      return (
                        <div key={index}>
                          {data.grossAmount ? (
                            <>
                              <input
                                type="radio"
                                name="color-name"
                                id=""
                                className={
                                  data.size[index].includes("Blue")
                                    ? " radio-bg-blue  "
                                    : data.size[index].includes("White")
                                    ? "radio-bg-white "
                                    : data.size[index].includes("Black")
                                    ? " radio-bg-black"
                                    : data.size[index].includes("Mint")
                                    ? " radio-bg-mint "
                                    : data.size[index].includes("Pink")
                                    ? " radio-bg-pink "
                                    : data.size[index].includes("Green")
                                    ? " radio-bg-green "
                                    : " radio-bg-default"
                                }
                                checked={
                                  data.size[index] === data.cap ? true : false
                                }
                                value={(value, data)}
                                onChange={() =>
                                  imgHandler(
                                    value,
                                    data.size[index],
                                    data.price[index],
                                    data.grossAmountOption[index]
                                  )
                                }
                              />
                            </>
                          ) : (
                            <input
                              type="radio"
                              name="color-name"
                              id=""
                              className={
                                data.size[index].includes("Black / Onyx")
                                  ? "radio-bg-black-onyx"
                                  : data.size[index].includes("White / Pebble")
                                  ? " radio-bg-white-pebble"
                                  : data.size[index].includes("White / Dune")
                                  ? " radio-bg-white-dune"
                                  : data.size[index].includes("Black / Pine")
                                  ? " radio-bg-black-pine"
                                  : data.size[index].includes("White / Coral")
                                  ? " radio-bg-white-coral"
                                  : data.size[index].includes("Blue")
                                  ? " radio-bg-blue  "
                                  : data.size[index].includes("White")
                                  ? "radio-bg-white "
                                  : data.size[index].includes("Black")
                                  ? " radio-bg-black"
                                  : data.size[index].includes("Mint")
                                  ? " radio-bg-mint "
                                  : data.size[index].includes("Pink")
                                  ? " radio-bg-pink "
                                  : data.size[index].includes("Green")
                                  ? " radio-bg-green "
                                  : " radio-bg-default"
                              }
                              checked={
                                data.size[index] === data.cap ? true : false
                              }
                              value={(value, data)}
                              onChange={() =>
                                imgHandler(
                                  value,
                                  data.size[index],
                                  data.price[index]
                                )
                              }
                            />
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "no"
                )}
              </div>
            </>
          )}
          <br />
          <button
            className="btn-cart"
            onClick={() =>
              handleAddItem({
                id: targetIndex,
                bottleSize: bottleSize,
                src: data.src,
                cap: data.cap,
                rs: data.rs,
                h5: data.h5,
                totalQuantities: 1,
                totalPrice: data.rs,
              })
            }
          >
            Add to cart-${data.rs}
          </button>
          <div className="info">
            <p>
              Or 4 interest-free installments of $28.75{" "}
              <BsFillInfoCircleFill className="info-icon" />
            </p>
            <p>Free shipping within the contiguous U.S. on orders over $80.</p>
          </div>
          <br />
          <div className="info-more">
            <div>
              <IoIosCheckmarkCircleOutline className="cart-icon" />
              <p>1 year warranty</p>
            </div>
            <div>
              <IoArrowBackCircleOutline className="cart-icon" />
              <p>Free returns</p>
            </div>
            <div>
              <HiOutlineShieldCheck className="cart-icon" />
              <p>Secure checkout</p>
            </div>
          </div>
          <hr />
          <p className="bottle-txt">
            LARQ Bottle Flip Top makes it easy to hydrate on the go — just flip
            the straw up for easy access. Take hydration to the next level with
            PureVis™ and Nano Zero. Switch between filtering out contaminants
            with the LARQ Filter Straw or the self-cleaning power of the LARQ
            Bottle PureVis™ Cap.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuyProduct;
