import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const API_URL = "https://vast-woodland-33247.herokuapp.com";
const personMarker = L.icon({ iconUrl : require("./../assets/man-waving-arm.png") });

export default class BarMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        lat: 51.505,
        lng: -0.09,
        zoom: 3,
      },
      barData: [],
    }
  }

  componentWillMount() {

    // This gets the current location of the user.
    this.getPosition().then((pos) => {
      const tmpCoords = {
        lat : pos.coords.latitude,
        lng : pos.coords.longitude,
        zoom : 11,
      }
      this.setState({coords : tmpCoords});

      this.getNearestBars();
    });
  }


  getPosition(pos) {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  getNearestBars() {
    return fetch(`${API_URL}/bars/getNearest?lat=${this.state.coords.lat}&lng=${this.state.coords.lng}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({barData :  data});
        console.log(this.state.barData);
      });
  }

  render() {
    const position = [this.state.coords.lat, this.state.coords.lng]
    return (
      <Map style={styles.mapStyle} center={position} zoom={this.state.coords.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Marker icon={personMarker} position={position}>
          <Popup>
            <center>
              <span><b>ME!</b></span>
            </center>
          </Popup>
        </Marker>
      {
        this.state.barData.map((bar, idx) =>
          <Marker key={`marker-${idx}`} position={[bar.lat, bar.lng]}>
            <Popup>
              <center>
                <span><b>{bar.name}</b></span> <br/>
                <span><b>Rating:</b> {bar.rating}</span> <br/>
                <span><a href={`tel:${bar.phone}`}>{bar.phone}</a></span> <br/>
              </center>
            </Popup>
          </Marker>
      )}
      </Map>
    )
  }
}

const styles = {
  mapStyle: {
    height: '50vh',
  }
}
