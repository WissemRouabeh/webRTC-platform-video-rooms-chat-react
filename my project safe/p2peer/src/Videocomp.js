import React from "react";

function Videocomp({ ref }) {
  return (
    <div>
      <video className="etud" ref={ref}></video>
    </div>
  );
}

export default Videocomp;
