import React, { Component } from 'react';
import BarMap from './BarMap';

class Map extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        lat: 0,
        lng: 0,
        zoom: 2,
      },
      barData: [],
      locationServicesOn: props.location.state.locationServicesOn,
    }
  }

  barDataCallBack = (bars) => {
    console.log("yeet, " + bars);
    this.setState({barData: bars})
  }

  render() {
    return (
      <div>
        {/* Map Container */}
        <div style={styles.mapCanvas}>
          <BarMap
            callBackFromMap={this.barDataCallBack}
            coords={this.state.coords}
            barData={this.state.barData}
            />
        </div>

        {/* Scroll Container */}
        <div style={styles.scollContainer}>
          <div style={styles.scroller}>
            {this.state.barData.map((bar, idx) => {
              return (
                <h3 style={styles.bar}>{bar.name}</h3>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  title: {
    backgroundColor: '#202424',
    position: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2em',
    borderRadius: '5px',
  },
  mapCanvas: {
    backgroundColor:'white',
    height: '50vh',
    width: '100vw',
    position: 'relative',
    display: 'block',
  },
  scollContainer: {
    backgroundColor: '#202424',
    height: '50vh',
    width: '100vw',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroller: {
    margin: '0 auto',
    height: '50vh',
    width: '22em',
    overflow: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bar: {
    color: 'white',
    textAlign: 'center'
  }
}

export default Map;
