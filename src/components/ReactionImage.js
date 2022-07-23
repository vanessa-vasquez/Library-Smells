import React from "react";
import bad from "../assets/badsmell.png";
import good from "../assets/goodsmell.png";
import Image from "react-bootstrap/Image";

export default function ReactionImage({ avgRating }) {
  return (
    <>
      {avgRating >= 4 ? (
        <Image fluid="true" src={good} />
      ) : (
        <Image fluid="true" src={bad} />
      )}
    </>
  );
}
