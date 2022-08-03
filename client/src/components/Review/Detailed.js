import { useState } from "react";

const Detailed = (props) => {
  const { item } = props;
  const [isDetailed, setIsDetailed] = useState(false);

  return isDetailed ? (
    <>
      {item.content}
      &nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          setIsDetailed(!isDetailed);
        }}
        style={{ color: "#5d90ef", backgroundColor: "white", border: 0 }}
      >
        ...접기
      </button>
    </>
  ) : (
    <>
      {item.content.substring(0, item.content.length / 2)}
      &nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          setIsDetailed(!isDetailed);
        }}
        style={{
          color: "#5d90ef",
          backgroundColor: "white",
          border: 0,
        }}
      >
        ...펼치기
      </button>
    </>
  );
};

export default Detailed;
