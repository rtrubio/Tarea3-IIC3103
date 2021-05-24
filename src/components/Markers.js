import React from 'react'
import {Marker, Popup} from 'react-leaflet'
import {Airplanes} from './Airplanes'

const Markers = () => {
    return (
        <Marker position={{lat:'-33.401514027484666', lng:'-70.56933711286692'}} icon={Airplanes}>
            <Popup>
                Location of marker
            </Popup>
        </Marker>
    );
};

export default Markers