import React from 'react'
import {Map, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from "./Markers"

const MapView = () => {
    return (
        <Map center={{lat: '51.52437', lng: '13.41053'}} zoom={2}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Markers/>
        </Map>
    );
};

export default MapView
