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
        lat: 0,
        lng: 0,
        zoom: 2,
      },
      barData: [],
    }
  }

  componentWillMount() {
    this.getPosition().then((pos) => {
      const tmpCoords = {
        lat : pos.coords.latitude,
        lng : pos.coords.longitude,
        zoom : 11,
      }
      this.setState({coords : tmpCoords});
      console.log("Location Services Enabled.");
      this.getNearestBars();
    });
  }

  getPosition(pos) {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, this.error);
    });
  }

  error() {
    this.setState({locationServicesOn : false});
    console.log("err");
  }

  async getNearestBars() {
    const data = await fetch(`${API_URL}/bars/getNearest?lat=${this.state.coords.lat}&lng=${this.state.coords.lng}`);
    const data_1 = await data.json();
    this.setState({ barData: data_1 });
    this.props.callBackFromMap(data_1);
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
          <Popup autoPan={true}>
            <center>
              <span><b>me thirsty!</b></span>
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
