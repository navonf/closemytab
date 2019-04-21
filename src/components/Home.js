import React, { Component } from 'react';
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

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }
  }

  render() {
    return (
      <div className="container">
        <StyledHeader 
          className="title"
          pose={this.state.hovering ? "hovered" : "idle"}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >
          bar hop.
        </StyledHeader>
        <FindBarsButton />
      </div>
    )
  }

}

export default Home;
