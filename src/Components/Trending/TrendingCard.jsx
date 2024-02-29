import React, { useState } from "react";
import "./trending-card.css";
import { data } from "./data";
import { Link } from "react-router-dom";
import { cartData } from "../Buy/cartData";
const TrendingCard = ({ Props, Index }) => {
  const [img, setImg] = useState(false);
  const imageChangeHandler = (v, i) => {
    data.forEach((item, index) => {
      if (Index === index) {
        item.src = v;
        // item.h5 = item.name[i];
        item.cap = item.size[i];
        item.rs = item.price[i];
        if (item.grossAmount) {
          item.grossAmount = item.grossAmountOption[i];
        }
        setImg(!img);
      }
    });
  };

  return (
    <>
      <section className="trending-card">
        <div
          className={
            Props.cap !== undefined
              ? Props.cap.includes("Blue")
                ? "trending-shop-card bg-blue  "
                : Props.cap.includes("Green")
                ? "trending-shop-card bg-green "
                : Props.cap.includes("White")
                ? "trending-shop-card bg-white "
                : Props.cap.includes("Black")
                ? "trending-shop-card bg-black "
                : Props.cap.includes("Mint")
                ? "trending-shop-card bg-mint "
                : Props.cap.includes("Pink")
                ? "trending-shop-card bg-pink "
                : "trending-shop-card bg-default "
              : "trending-shop-card bg-default "
          }

          // className="trending-shop-card"
        >
          <div className="shop-card-img">
            <Link
              // to="bottle"
              to={`bottle/${Index}`}
              state={{
                mainSrc: Props.src,
                mainName: Props.h5,
                mainSize: Props.cap,
                mainAmount: Props.rs,
                srcOption: Props.option,
                amountOption: Props.price,
                sizeOption: Props.size,
              }}
            >
              <img
                className={
                  Props.cap.includes("34 oz")
                    ? "img-scale img__sm"
                    : "img img__sm"
                }
                src={Props.src}
                alt=""
              />
            </Link>
          </div>
          <div className="shop-card-txt">
            <h5>{Props.h5}</h5>
            <p> {Props.cap}</p>
            <div className="shop-card-option">
              {Props.option.map((v, i) => {
                return (
                  <div key={i + v} className="option-img">
                    <img
                      style={
                        Props.src === v
                          ? { border: "1px solid black" }
                          : Props.src === v
                          ? { border: "1px solid black" }
                          : Props.src === v
                          ? { border: "1px solid black" }
                          : Props.src === v
                          ? { border: "1px solid black" }
                          : Props.src === v
                          ? { border: "1px solid black" }
                          : Props.src === v
                          ? { border: "1px solid black" }
                          : { border: "none" }
                      }
                      className="tr-mini-img border-10"
                      src={v}
                      alt=""
                      onClick={() => imageChangeHandler(v, i)}
                    />
                  </div>
                );
              })}
            </div>
            <span>
              From{" "}
              {Props.grossAmount ? (
                <span className="gross-amount">${Props.grossAmount + " "}</span>
              ) : null}
              ${Props.rs}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingCard;
