import React, { useState } from 'react';
import FindBarsButton from './Buttons/FindBarsButton';
import posed from "react-pose";
import styled from "styled-components";

import "./Home.css";

const posedh1 = posed.h1({
  idle: { scale: 1 },
  hovered: { scale: 1.20 }
});

const StyledHeader = styled(posedh1)`
background: none;
`;

const Home = () => {
  const [ hovering, setHovering ] = useState(false);
  return (
    <div className="container">
      <StyledHeader 
          className="title"
          pose={hovering ? "hovered" : "idle"}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          bar hop.
        </StyledHeader>
        <FindBarsButton />
    </div>
  );
}
 

export default Home;
