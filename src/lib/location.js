const path = require('path');

import Vehicle from './vehicle';
import Graph from './graph';
import Edge from './edge';

export default class Location {
    constructor(name, latitude, longitude, x, y, vehicleTypes, vehicles) {
        this.name = name;
		this.x = x;
		this.y = y;
		this.vehicleTypes = vehicleTypes;
		this.vehicles = vehicles;
		this.lat = latitude;
		this.lon = longitude;
        this.dist = Infinity;

		// Initialize Adjacency HashMap and map each vehicle to an ArrayList of Edges
		this.adjacent = new Map();
        vehicles.forEach((vehicle) => {
            if (vehicle) {
                this.adjacent.set(vehicle, []);
            }
        });
    }

    addNeighbor = (neighbor, weight, vehicle) => {
        // var e = new Edge(this, neighbor, weight, vehicle);
        // if (this.adjacent[vehicle.name] != undefined && !this.adjacent[vehicle.name].includes(e)) {
        //     this.adjacent[vehicle.name].push(e);
        // }

        let e = new Edge(this, neighbor, weight , vehicle);
		if (!this.adjacent.get(vehicle).includes(e))
			this.adjacent.get(vehicle).push(e);
    };
}

// function Location(line) {
    // let i;

    // // Split each line into its respective parameters
    // var payload = line.split(",");

    // // // Split vehicle types and parse them based on their values
    // var types = payload[5].split("|");
    // var vehicleTypes = new Array(types.length);
    // for (i = 0; i < types.length; i++)
    //     vehicleTypes[i] = types[i] === "1";


    // var vehiclePayload = [];

    // // Initialize all Vehicles at that location
    // for (i = 0; i < vehicleTypes.length; i++) {
    //     if (vehicleTypes[i]) {
    //         let v = Vehicle.getVehicle(Vehicle.vehicleNames[i]);
    //         vehiclePayload.push(v);
    //     } else
    //         vehiclePayload.push(null);
    // }

//     this.name = payload[0];
//     this.x = parseFloat(payload[3]);
//     this.y = parseFloat(payload[4]);
//     this.vehicleTypes = vehicleTypes;
//     this.vehicles = vehiclePayload;
//     this.lat = parseInt(payload[1]);
//     this.lon = parseInt(payload[2]);
//     this.dist = Infinity;
//     this.prev = null;

//     // Initialize Adjacency HashMap and map each vehicle to an ArrayList of Edges

//     this.adjacent = {};
//     vehiclePayload.forEach((payload) => {
//         if (payload) {
//             this.adjacent[payload.name] = [];
//         }
//     })
// }

// Location.prototype.addNeighbor = function(neighbor, weight, vehicle) {
//     var e = Edge.createEdge(this, neighbor, weight, vehicle);
//     if (this.adjacent[vehicle.name] != undefined && !this.adjacent[vehicle.name].includes(e)) {
//         this.adjacent[vehicle.name].push(e);
//     }
// };

export const getDistance = (loc1, loc2) => {
    return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2));
};

export const getHaversineDistance = (l1, l2) => {
    var lat1 = l1.lat;
    var lon1 = l1.lon;
    var lat2 = l2.lat;
    var lon2 = l2.lon;

    var R = 6371; // meters

    var φ1 = Math.PI / 180 * (lat1);
    var φ2 = Math.PI / 180 * (lat2);
    var Δφ = Math.PI / 180 * (lat2 - lat1);
    var Δλ = Math.PI / 180 * (lon2 - lon1);

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;

    return d * 0.621371;
};

// module.exports = {
//     getLocations: () => {
//         const locationsTxt = fs.readFileSync(path.resolve(__dirname, '../settings/Locations.txt'), 'utf8');
//         const lines = locationsTxt.split('\n').slice(1);
//         return lines.map((line) => {
//             let loc = new Location(line);
//             // Create a new Location object and add it to the list
//             console.log('Graph: ')
//             console.log(Graph.locations);
//             Graph.locations.push(loc);
//             Graph.addVertex(loc);
//             return loc;
//         })
//     },
//     getDistance: getDistance
// };