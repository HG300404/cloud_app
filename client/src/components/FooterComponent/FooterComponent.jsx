import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Col, Image } from "antd";
import {
  WrapperFooter,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
} from "./style";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputForm from "../InputForm/InputForm";

const logo =
  "https://hakingdoms.s3.ap-southeast-2.amazonaws.com/images/logo.png";
const FooterComponent = () => {
  const styleLi = {
    color: "#fff",
    listStyleType: "none",
    width: "40px",
    height: "40px",
    backgroundColor: "hsla(267, 100%, 63%, 0.3)",
    display: "grid",
    placeItems: "center",
    clipPath: "polygon(0% 0%, 70% 0, 100% 30%, 100% 100%, 0 100%)",
    transition: "250ms ease",
    marginRight: "10px",
  };
  const styleColP = {
    fontSize: "2rem",
    fontWeight: "600",
    lineHeight: 1,
    position: "relative",
    paddingBlockEnd: "10px",
    marginBlockEnd: "20px",
    maxWidth: "max-content",
    color: "#fff",
  };
  const styleColSpan = {
    color: "hsla(267, 100%, 63%, 1)",
    fontSize: "1.4rem",
    textTransform: "uppercase",
    fontWeight: "600",
  };
  const styleColDiv = {
    marginBlockEnd: "15px",
    color: "#fff",
    fontSize: "larger",
  };
  const styleColA = {
    color: "#fff",
    paddingLeft: "2px",
  };
  const styleColInput = {
    backgroundColor: "hsla(240, 63%, 13%, 0.9)",
    color: "#fff",
    fontSize: "1.6rem",
    padding: "18px 12px",
    boxShadow: "0px 2px 5px 0px hsla(0, 0%, 0%, 0.2)",
    border: " 2px solid hsla(267, 100%, 63%, 0.3)",
    marginBlockEnd: "15px",
    outline: "none",
    maxWidth: "calc(90%)",
  };

  const [email, setEmail] = useState("");
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const navigate = useNavigate();

  const styleColButton = {
    position: "relative",
    backgroundImage:
      "linear-gradient(to right bottom, hsl(299, 100%, 52%), hsl(291, 100%, 58%), hsl(283, 100%, 60%), hsl(273, 100%, 62%), hsl(262, 100%, 63%), hsl(242, 100%, 69%), hsl(223, 100%, 62%), hsl(210, 100%, 50%), hsl(203, 100%, 50%), hsl(198, 100%, 50%), hsl(192, 100%, 48%), hsl(185, 90%, 48%))",
    color: "hsla(0, 0%, 100%, 1)",
    fontSize: "1.5rem",
    fontWeight: "600",
    maxWidth: "max-content",
    minWidth: "180px",
    height: "50px",
    display: "grid",
    placeItems: "center",
    paddingInline: "30px",
    clipPath: "polygon(0% 0%, 90% 0, 100% 30%, 100% 100%, 0 100%)",
    overflow: "hidden",
  };
  const styleIcon = {
    fontSize: "larger",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1100px",
        marginBottom: "50px",
      }}
    >
      <WrapperFooter>
        <Col span={8} style={{ color: "#fff" }}>
          <img
            src={logo}
            style={{
              display: "block",
              width: "50%",
              marginBottom: "20px",
            }}
            alt="logo"
          ></img>
          <div>
            <p style={styleColP}>JOIN OUR NEWSLETTER</p>

            <InputForm
              style={styleColInput}
              placeholder="Your Email"
              value={email}
              onChange={handleOnchangeEmail}
            />
            <ButtonComponent
              size="larger"
              styleButton={styleColButton}
              styleTextButton={{}}
              textButton="Subscribe Now"
            />
          </div>
        </Col>
        <Col span={8}>
          <p style={styleColP}>Contact Us</p>

          <div style={styleColDiv}>
            <span style={styleColSpan}>Location: </span>

            <a style={styleColA}>48 Binh Ki, Hoa Quy, Ngu Hanh Son, Da Nang</a>
          </div>

          <div style={styleColDiv}>
            <span style={styleColSpan}>Join Us:</span>

            <a style={styleColA} href="mailto:hakingdoms.com">
              hakingdoms.com
            </a>
          </div>

          <div style={styleColDiv}>
            <span style={styleColSpan}>Phone:</span>

            <a href="tel:0823469991" style={styleColA}>
              0823469991
            </a>
          </div>
        </Col>
        <Col span={8}>
          <ul style={{ display: "flex" }}>
            <li style={styleLi}>
              <FacebookOutlined style={styleIcon} />
            </li>

            <li style={styleLi}>
              <TwitterOutlined style={styleIcon} />
            </li>

            <li style={styleLi}>
              <InstagramOutlined style={styleIcon} />
            </li>

            <li style={styleLi}>
              <YoutubeOutlined style={styleIcon} />
            </li>
          </ul>
        </Col>
      </WrapperFooter>
    </div>
  );
};

export default FooterComponent;
