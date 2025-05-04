import React from "react";
import { useNavigate } from "react-router-dom";

const g1 = "https://hakingdoms.s3.ap-southeast-2.amazonaws.com/images/pubg.png";

const cardStyle = {
  width: "280px",
  height: "440px",
  margin: "10px",
  border: "1px solid white",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  marginBottom: "50px",
  transform: "scale(0.8)",
};

const imageStyle = {
  width: "100%",
  height: "70%",
  objectFit: "cover",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  padding: "5px",
  textAlign: "center",
  color: "#fff",
};

const priceStyle = {
  fontSize: "18px",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#9400D3",
};

const discountStyle = {
  color: "white",
  backgroundColor: "red",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "10px",
  right: "10px",
};

const buttonStyle = {
  width: "80%",
  height: "40px",
  margin: "10px auto",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "green",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

const steamStyle = {
  width: "40px",
  height: "40px",
  position: "absolute",
  bottom: "10px",
  right: "10px",
};

const CardComponent = (props) => {
  const {
    image,
    name,
    price,
    type,
    description,
    rating,
    platform,
    discount,
    selled,
    id,
  } = props;

  const priceProduct = (price, discount) => {
    var result = price - price * (discount / 100);
    return result.toFixed(2);
  };
  const navigate = useNavigate();
  const handleDetailsGame = (id) => {
    navigate(`/game-details/${id}`);
  };
  return (
    <div style={cardStyle} onClick={() => handleDetailsGame(id)}>
      <img src={image} alt={name} style={imageStyle} />
      <div style={discountStyle}>-{discount}%</div>
      <div style={titleStyle}>{name}</div>
      <div style={priceStyle}>
        <del>${price}</del>
        <span
          style={{ color: "#D3D3D3", marginLeft: "8px", fontStyle: "bold  " }}
        >
          ${priceProduct(price, discount)}
        </span>
      </div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png"
        alt="Steam logo"
        style={steamStyle}
      />
      <button style={buttonStyle}>ADD TO CART</button>
    </div>
  );
};

export default CardComponent;
