import React, { useState } from 'react';
import BarMap from './BarMap';
import CircularProgress from '@material-ui/core/CircularProgress';
import BarButton from './Buttons/BarButton';
import './Map.css';

const Map = () => {
  const [ coords, setCoords ]       = useState({ lat: 0, lng: 0, zoom: 2 });
  const [ barData, setBarData ]     = useState([]);
  const [ loaded, setLoaded ]       = useState(false);
  const [ snapToBar, setSnapToBar ] = useState("");

  const barDataCallBack = (bars) => {
    setLoaded(true);
    setBarData(bars);
  }

  const clickBarName = (bar) => {
    console.log(bar.name);
  }

  const barButtonCallBack = (barName) => {
    setSnapToBar(barName);
  }

  const drinkButtonCallBack = (barName) => {
    console.log("bar name: " + barName);
  }

  const updateSnapToProps = () => {
    setSnapToBar("");
  }

  return (
    <div>
      {/* Map Container */}
      <div style={styles.mapCanvas}>
        <BarMap
          callBackFromMap={barDataCallBack}
          snapTo={snapToBar}
          endSnapToCallBack={updateSnapToProps}
          coords={coords}
          barData={barData}
          />
      </div>

      {/* Scroll Container */}
      {loaded ?
        <div style={styles.scollContainer}>
        <div style={styles.scroller}>
          {barData.map((bar, idx) => {
            return (
              <div>
              <p style={styles.bar}>{bar.name}</p>
              <p style={styles.barButtons}>
                ⭐{bar.rating} 
                <div style={styles.buttonsRow}>
                  <BarButton 
                    barName={bar.name} 
                    style={styles.barButtons}
                    callBackFromDrinkButton={drinkButtonCallBack}
                    callBackFromBarButton={barButtonCallBack}/>
                </div>
              </p>
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
  );
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
    textAlign: 'center',
    fontSize: '1.4em'
  },
  barButtons: {
    color: 'white',
    textAlign: 'center',
    fontSize: '1.3em',
  },
  loadingBar: {
  },
  loadingBarContainer: {
    margin: '2.5em auto',
    alignItems: 'center',
    display: 'flex',
    justifyContent:'center',
  },
  buttonsRow: {
    flexDirection: 'row'
  }
}

export default Map;
