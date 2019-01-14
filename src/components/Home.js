import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Link } from 'react-router-dom';

import "./Home.css";

const Home = (history) => {

    return (
      <Link
        to={{
          pathname: "/map",
          state: {foo: "passed"}
        }}
        style={styles.linkStyle}>
        <div class="container">
          <h1 class="title">Close My Tab</h1>
        </div>
      </Link>
    )

}

const styles = {
  linkStyle: {
    textDecoration: 'none',
  }
}

export default Home;
