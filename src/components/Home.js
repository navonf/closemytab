import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./Home.css";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      locationServicesOn : true,
    }
  }

  render() {
    return (
      <div>
        {this.state.locationServicesOn ?
          <Link
            to={{
              pathname: "/map",
              state: {
                locationServicesOn : this.state.locationServicesOn
              }
            }}
            style={styles.linkStyle}>
            <div className="container">
              <h1 className="title">bar hop.</h1>
              <span className="text">tap anywhere to find bars</span>
            </div>
          </Link> :
        <div className="container">
          <h1 className="text">
            this app is currently in development <br />
            and needs geoservices, sorry.
          </h1>
        </div>

        }
      </div>
    )
  }

}

const styles = {
  linkStyle: {
    textDecoration: 'none',
  }
}

export default Home;
