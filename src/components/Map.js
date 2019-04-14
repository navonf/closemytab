import React, { Component } from 'react';
import BarMap from './BarMap';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      loaded: false,
      locationServicesOn: props.location.state.locationServicesOn,
    }
  }

  barDataCallBack = (bars) => {
    this.setState({loaded: true});
    this.setState({barData: bars})
  }

  clickBarName = (bar) => {
    console.log(bar.name);
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
        {this.state.loaded ?
          <div style={styles.scollContainer}>
          <div style={styles.scroller}>
            {this.state.barData.map((bar, idx) => {
              return (
                <div>
                <h3 style={styles.bar}>{bar.name}</h3>
                </div>
              );
            })}
          </div>
        </div> :
        <div style={styles.loadingBarContainer}>
          <CircularProgress color={'primary'} style={styles.loadingBar} size={250} thickness={1}/>
        </div>
        }
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
    justifyContent: 'center',
  },
  bar: {
    color: 'white',
    textAlign: 'center'
  },
  loadingBar: {
  },
  loadingBarContainer: {
    margin: '2.5em auto',
    alignItems: 'center',
    display: 'flex',
    justifyContent:'center',
  }
}

export default Map;
