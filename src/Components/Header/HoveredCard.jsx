import React from "react";
import "./hovered-card.css";
import { Link } from "react-router-dom";
const HoveredCard = ({ Props }) => {
  return (
    <>
      <section key={Props.id}>
        {Props.map((item, index) => {
          return (
            <div className="hovered-container-main" key={index}>
              <div className="hovered-cards btn-section ">
                <button className="btn">Explore {item.btn1}</button>
                <button className="btn">Gift sets</button>
                <button className="btn-none ">{item.btn2}</button>
                <button className="btn-none ">Corporate gifting</button>
                <span>LEARN MORE</span>
                <button className="btn-none ">PureVis™ technology</button>
                <button className="btn-none ">Nano Zero technology</button>
              </div>
              <div className="hovered-cards">
                <div
                  className={
                    item.active ? "container-active" : "container-first"
                  }
                >
                  <Link to={item.link1}>
                    <img className="img" src={item.src1} alt="" />
                  </Link>
                  <div className="hovered-card-text">
                    <h5>{item.img1h5}</h5>
                    <p>{item.type1}</p>
                    <p>{item.img1p}</p>
                  </div>
                </div>
              </div>
              <div className="hovered-cards">
                <div
                  className={
                    item.active ? "container-active" : "container-first"
                  }
                >
                  <Link to={item.link2}>
                    <img className="img" src={item.src2} alt="" />
                  </Link>
                  <div className="hovered-card-text">
                    <h5>{item.img2h5}</h5>
                    <p>{item.type2}</p>
                    <p>{item.img2p}</p>
                  </div>
                </div>
              </div>
              {item.src3 ? (
                <div className="hovered-cards">
                  <div
                    className={
                      item.active ? "container-active" : "container-first"
                    }
                  >
                    <Link to={item.link3}>
                      <img className="img" src={item.src3} alt="" />
                    </Link>
                    <div className="hovered-card-text">
                      <h5>{item.img3h5}</h5>

                      <p> {item.img3p}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HoveredCard;
