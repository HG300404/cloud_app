import { Col, Row, Image, Rate } from "antd";
import React, { useEffect, useState } from "react";

import {
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperPriceGach,
} from "./style";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as GameService from "../../services/GameService.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrderGame } from "../../redux/slides/orderSlide";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent.jsx";
import CommentComponent from "../CommentComponent/CommentComponent.jsx";
import { initFacebookSDK } from "../../utils.js";

const imageProduct =
  "https://hakingdoms.s3.ap-southeast-2.amazonaws.com/images/garena.jpg";
const imageProductSmall =
  "https://hakingdoms.s3.ap-southeast-2.amazonaws.com/images/top3.jfif";
const ProductDetailsComponent = ({ idGame }) => {
  const [stateGameDetails, setStateGameDetails] = useState({
    name: "",
    type: "",
    price: "",
    platform: "",
    rating: "",
    description: "",
    discount: "",
    selled: "",
    image: "",
  });

  const dispatch = useDispatch();
  const fetchGetDetailsGame = async () => {
    const res = await GameService.getDetailsGame(idGame);
    if (res?.data) {
      setStateGameDetails({
        name: res?.data?.name,
        type: res?.data?.type,
        price: res?.data?.price,
        platform: res?.data?.platform,
        rating: res?.data?.rating,
        description: res?.data?.description,
        discount: res?.data?.discount,
        selled: res?.data?.selled,
        image: res?.data?.image,
      });
    }
  };
  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (idGame) {
      fetchGetDetailsGame(idGame);
    }
  }, [idGame]);

  const paymentMethods = [
    {
      id: "visa",
      name: "VISA",
      logo: "https://i.ibb.co/vjQCN4y/Visa-Card.png",
    },
    {
      id: "mastercard",
      name: "Mastercard",
      logo: "https://i.ibb.co/vdbBkgT/mastercard.jpg",
    },
    {
      id: "paypal",
      name: "Paypal",
      logo: "https://i.ibb.co/KVF3mr1/paypal.png",
    },
    {
      id: "AMEX",
      name: "AMEX",
      logo: "https://i.ibb.co/wQnrX86/American-Express.jpg",
    },
  ];

  const priceProduct = (price, discount) => {
    var result = price - price * (discount / 100);
    return result.toFixed(2);
  };
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation(); // link hien tai
  const handleAddOrderGame = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderGame({
          orderItem: {
            name: stateGameDetails?.name,
            image: stateGameDetails?.image,
            price: stateGameDetails?.price,
            discount: stateGameDetails?.discount,
            totalPrice: priceProduct(
              stateGameDetails.price,
              stateGameDetails.discount
            ),
            game: idGame,
          },
        })
      );
    }
  };
  return (
    <div>
      <Row style={{ padding: "16px", borderRadius: "4px" }}>
        <Col
          span={10}
          // style={{ borderRight: "1px solid #e5e5e5"}}
        >
          <Row>
            <Image
              src={stateGameDetails.image}
              alt="Image Product"
              preview={false}
              style={{ width: "450px", height: "400px" }}
            />
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "90px" }}>
          <WrapperStyleNameProduct>
            {stateGameDetails.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate disabled defaultValue={4.5} />
            <WrapperStyleTextSell>
              {" "}
              Bye {stateGameDetails.selled}
            </WrapperStyleTextSell>
          </div>

          <WrapperPriceProduct>
            <WrapperPriceGach> {stateGameDetails.price}$</WrapperPriceGach>
            <WrapperPriceTextProduct>
              {priceProduct(stateGameDetails.price, stateGameDetails.discount)}$
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <LikeButtonComponent
            dataHref={"https://developers.facebook.com/docs/plugins/"}
          />
          {/* <div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="" data-action="" data-size="" data-share="true"></div> */}
          <div
            style={{
              margin: "0 10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4 style={{ color: "#fff", fontSize: "14px" }}>
              Select a <span style={{ color: "#6064b6" }}>Payment</span> method:
            </h4>
            <form
              action="#"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {paymentMethods.map((method, index) => (
                <div key={index} style={{ margin: "0 10px" }}>
                  <input type="radio" name="payment" id={method.id} />
                  <label
                    htmlFor={method.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img src={method.logo} alt="" style={{ width: "50px" }} />
                    <span>
                      <i style={{ color: "#6064b6" }}></i>
                    </span>
                  </label>
                </div>
              ))}
            </form>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            <ButtonComponent
              bordered={false}
              size={40}
              styleButton={{
                backgroundColor: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Choose Buy"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>

            <ButtonComponent
              bordered={false}
              size={40}
              styleButton={{
                backgroundColor: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid rgb(13,92,182)",
                borderRadius: "4px",
              }}
              onClick={handleAddOrderGame}
              textButton={"Add Cart"}
              styleTextButton={{ color: "rgb(13,92,182)", fontSize: "15px" }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
      <div
        style={{
          color: "white",
          fontSize: "17px",
          lineHeight: "2",
          padding: "16px",
          display: "flex",
          // justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%" }}>
          <h2>About this game</h2>
          <h4>What is {stateGameDetails.name} ?</h4>
          <p>{stateGameDetails.description}</p>
        </div>

        <div>
          <h2>Game Details</h2>
          <ul>
            <li style={{ paddingBottom: "20px", paddingLeft: "20px" }}>
              <u style={{ color: "#9932CC" }}>Genres:</u>{" "}
              {stateGameDetails.type}
            </li>
            <li style={{ paddingBottom: "20px", paddingLeft: "20px" }}>
              <u style={{ color: "#9932CC" }}>Platforms:</u>
              {stateGameDetails.platform}
            </li>
            <li style={{ paddingBottom: "20px", paddingLeft: "20px" }}>
              <u style={{ color: "#9932CC" }}>Publisher:</u> Riot Games
            </li>
            <li style={{ paddingBottom: "20px", paddingLeft: "20px" }}>
              <u style={{ color: "#9932CC" }}>Related Day:</u> 12/9/2012
            </li>
            <li style={{ paddingBottom: "20px", paddingLeft: "20px" }}>
              <u style={{ color: "#9932CC" }}> Ratings:</u>
              {stateGameDetails.rating}
            </li>
          </ul>
        </div>
      </div>
      <CommentComponent
        dataHref={
          "https://developers.facebook.com/docs/plugins/comments#configurator"
        }
        width="1270"
      />
    </div>
  );
};
export default ProductDetailsComponent;
