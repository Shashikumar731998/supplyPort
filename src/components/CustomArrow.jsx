// src/components/CustomArrows.js

import React from 'react';
import { PiGreaterThanFill, PiLessThanFill } from 'react-icons/pi';

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", fontSize: "24px", zIndex: 1 ,
        // color:"#33a1e1"
    }}
      onClick={onClick}
    >
      <PiLessThanFill />
    </div>
  );
};

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", fontSize: "24px", zIndex: 1 ,
        // color:"#33a1e1"
    }}
      onClick={onClick}
    >
      <PiGreaterThanFill />
    </div>
  );
};
