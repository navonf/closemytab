import React, { Component } from 'react';
import BarMap from './BarMap';

class Map extends Component {

  displayMap() {
    styles.mapCanvas.display = 'block';
  }

  render() {
    return (
      <div>
        {/* Map Container */}
        <div style={styles.mapCanvas}>
          {this.displayMap()}
          <BarMap />
        </div>

        {/* Scroll Container */}
        <div>
        </div>
      </div>
    )
  }
}

const styles = {
  title: {
    backgroundColor:'#202424',
    position: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2em',
    borderRadius: '5px',
  },
  mapCanvas: {
    backgroundColor:'white',
    height: '40vh',
    width: '100vw',
    position: 'relative',
    display: 'none',
  }
}

export default Map;
