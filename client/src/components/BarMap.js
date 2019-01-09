import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class BarMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        lat: 51.505,
        lng: -0.09,
        zoom: 3,
      }
    }
  }

  componentWillMount() {
    // This gets the current location of the user.
    this.getPosition().then((pos) => {
      const tmpCoords = {
        lat : pos.coords.latitude,
        lng : pos.coords.longitude,
        zoom : 13,
      }
      this.setState({coords : tmpCoords});
    });
  }

  getPosition(pos) {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  render() {
    const position = [this.state.coords.lat, this.state.coords.lng]
    return (
      <Map style={styles.mapStyle} center={position} zoom={this.state.coords.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

const styles = {
  mapStyle: {
    height: '50vh',
  }
}
