import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'

export const Airplanes = L.icon({
    iconUrl: icon,
    /*
    iconRetinaUrl: require('../assets/logo.svg'),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    */
    iconSize: [30, 40],
    /*
    className: 'leaflet-venue-icon',
    */
}); 

/* export default Airplanes */