import './App.css';
import React from 'react'
import io from 'socket.io-client';
//import MapView from './components/MapView';
import { useState, useEffect } from 'react';
import socket from './components/Socket';
import Chat from './components/Chat';

// imports de MapView.js y Markers.js
import { Map, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import {Airplanes} from './components/Airplanes'

//const io = require('socket.io-client')
//const socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl', {
//    path: "/flights"
//});

function App() {

  const info_vuelos = [];
  // aca van los useState
  const [positions, setPositions] = useState([]);
  const [flights, setFlights] = useState([]);
  const [aux, setAux] = useState("");

  const pos_actual = positions;

  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = (e) => {
    e.preventDefault();
    if(name !== ""){
      setRegistered(true)
    }
  }
  
  //const polyline = [
  //  [51.52437, 13.7888],
  //  [40.51, 13.41053],
  //];

  useEffect(() => {
    //console.log('emitiendo un vuelo');
    socket.emit('FLIGHTS');
    //console.log('vuelo emitido');
  }, [] );

  useEffect(() => {
    socket.on('POSITION', vuelo => {
      //console.log('nuevas posiciones de vuelos');
      //const pos_actual = positions;
      pos_actual[vuelo.code] = vuelo;
      setPositions(pos_actual);
      //console.log(positions)
      //console.log(pos_actual);
      setAux(vuelo)
    });

    socket.on('FLIGHTS', function(data){
      //console.log('info del vuelo');
      //console.log(data);
      //console.log('fin info del vuelo');

      info_vuelos.push(data);
      setFlights(info_vuelos[0]);

      //console.log('print flights');
      //console.log(flights);
      //console.log('fin print flights');
      
      //Object.values(flights).map((airp) => (
      //  console.log([airp.origin, airp.destination])
      //))
    });
    //return () => {socket.off()}
  }, [aux] );


  return(
    <div>

    <Map center={{lat: '-33.57833835625107', lng: '-66.63795402257144'}} zoom={4}>
      <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {Object.values(positions).map((item) => (
          <Marker position={item.position} icon={Airplanes}>
              <Popup>
                  {item.code}
              </Popup>
          </Marker>
      ))}
      {Object.values(flights).map((info) => (
          <Polyline positions={[info.origin, info.destination]} color={'red'}>

          </Polyline>
      ))}
    </Map>

      {
        !registered &&

        <form onSubmit={register}>
          <label htmlFor="">Introduzca nombre para acceder al Chat</label>
          <input value={name} onChange={e => setName(e.target.value)}/>
          <button>Ingresar</button>
        </form>
      }

      {
        registered &&
        <Chat nombre={name}></Chat>
      }

      {Object.values(flights).map((info) => (
        <ul>
          <li><b>Airline</b>: {info.airline}</li>
          <li><b>Code</b>: {info.code}</li>
          <li><b>Plane</b>: {info.plane}</li>
          <li><b>Origin</b>: {info.origin}</li>
          <li><b>Destination</b>: {info.destination}</li>
          <li><b>Seats</b>: {info.seats}</li>
          <li><b>Passengers</b>:</li>
          {Object.values(info.passengers).map((psj) => (
            <ul>
              <li>{psj.name}: {psj.age} años</li>
            </ul>
          ))}
        </ul>
      ))}
    
    </div>
  );

};

export default App;

/*
<Polyline positions={polyline}></Polyline>

{Object.values(flights).map((info) => (
  <Polyline position={[info.origin, info.destination]} color={'red'}></Polyline>
))}

{flights.map((info) => (
    <Polyline position={[info.origin, info.destination]} color={'red'}></Polyline>
))}
*/