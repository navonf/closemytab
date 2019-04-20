import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Control from 'react-leaflet-control';
import L from 'leaflet';
import Fab from '@material-ui/core/Fab';
import MyLocation from '@material-ui/icons/MyLocation';
import Hamburger from '@material-ui/icons/Dehaze';

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
      originalCoords: {
        lat: 0,
        lng: 0,
        zoom: 2,
      },
      barData: [],
    }

    this.getNearestBars = this.getNearestBars.bind(this);
    this.updatePositionMarker = this.updatePositionMarker.bind(this);
    this.snapToOriginalPosition = this.snapToOriginalPosition.bind(this);
  }

  componentWillMount() {
    this.getPosition().then((pos) => {
      const tmpCoords = {
        lat : pos.coords.latitude,
        lng : pos.coords.longitude,
        zoom : 11,
      }
      this.setState({coords : tmpCoords});
      this.setState({originalCoords : tmpCoords});
      console.log("Location Services Enabled.");
      this.getNearestBars(this.state.coords.lat, this.state.coords.lng);
    });
  }

  getPosition(pos) {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, this.error);
    });
  }

  error() {
    // this.setState({locationServicesOn : false});
    console.log("err");
  }

  async getNearestBars(lat, lng) {
    const data = await fetch(`${API_URL}/bars/getNearest?lat=${lat}&lng=${lng}`);
    const data_1 = await data.json();
    this.setState({barData: data_1});
    this.props.callBackFromMap(data_1);
  }

  updatePositionMarker(e) {
    const latlng = e.target.getLatLng();
    const newCoords = {
      lat : latlng.lat,
      lng : latlng.lng,
      zoom : 11,
    }
    this.setState({coords: newCoords});
    this.getNearestBars(newCoords.lat, newCoords.lng);
  }

  snapToOriginalPosition() {
    const org = this.state.originalCoords;
    this.setState({coords: org});
    this.getNearestBars(org.lat, org.lng);
  }

  render() {
    const position = [this.state.coords.lat, this.state.coords.lng]
    // https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmF2b25mIiwiYSI6ImNqdW9vdG84ZTMxaDAzeW5xcjd4Y28xdnAifQ.D_EM5YywMts0q7qDBQciVg
    // const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    // const mapUrl = "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
    const mapUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmF2b25mIiwiYSI6ImNqdW9vdG84ZTMxaDAzeW5xcjd4Y28xdnAifQ.D_EM5YywMts0q7qDBQciVg"


    return (
      <Map 
        style={styles.mapStyle} 
        center={position} 
        zoomControl={false}
        zoom={this.state.coords.zoom}
      >
        <Control position="topleft" >
          <Fab color={"primary"}>
            <Hamburger />
          </Fab>
        </Control>
        <Control position="topright" >
          <Fab color={"secondary"} onClick={this.snapToOriginalPosition}>
            <MyLocation />
          </Fab>
        </Control>
        <TileLayer
          attribution='Drink Responsibly :)'
          url={mapUrl}
        />
        <Marker 
          draggable={true} 
          zIndexOffset={1000} 
          icon={personMarker} 
          position={position} 
          onDragEnd={this.updatePositionMarker}
        >
          <Popup autoPan={true}>
            <center>
              <span>me thirsty!</span>
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
