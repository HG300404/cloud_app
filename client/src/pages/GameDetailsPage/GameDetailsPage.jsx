import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import GameDetailsComponent from "../../components/GameDetailsComponent/GameDetailsComponent";
const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          width: "1270px",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <h2 style={{ color: "#fff" }}>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </span>{" "}
          - Game Details
        </h2>
        <GameDetailsComponent idGame={id} />
      </div>
    </div>
  );
};

export default GameDetailsPage;
