import Vehicle from '../lib/vehicle';
import Location, { getDistance } from '../lib/location';
import Passenger from '../lib/passenger';
// import Edge from '../lib/edge';
import Graph from '../lib/graph';
import fs from 'fs';
import path from 'path';
export let g = new Graph();
export let locations = [];
export let passengers = [];
export let vehicles = new Map();


export const loadVehicles = () => {
	// Initialize all Vehicles and add to the Vehicle HashMap
	for (let i = 0; i < 6; i++) {
		switch (i) {
			// Aircraft, Bart, Bicycle, Bus, Car, Taxi
			case 0:
				vehicles.set("Aircraft", new Vehicle('Aircraft', 575, 120, 400, 1));
				break;
			case 1:
				vehicles.set("Bart",new Vehicle("Bart", 60, 10, 8, 1));
				break;
			case 2:
				vehicles.set("Bicycle", new Vehicle("Bicycle", 10, 0, 0, 1));
				break;
			case 3:
				vehicles.set("Bus", new Vehicle("Bus", 30, 10, 0.5, 1));
				break;
			case 4:
				vehicles.set("Car", new Vehicle("Car", 50, 0, 3, 3));
				break;
			case 5:
				vehicles.set("Taxi", new Vehicle("Taxi", 50, 10, 1.5, 2));
				break;
		}
	}

	return vehicles;
}

export const loadLocations = () => {
	const locationsTxt = fs.readFileSync(path.join(__dirname, '../src/settings/Locations.txt'), 'utf8');
	const lines = locationsTxt.split('\n').slice(1);
	
	return lines.map((line) => {
		let i;

		// Split each line into its respective parameters
		var payload = line.split(",");

		// // Split vehicle types and parse them based on their values
		var types = payload[5].split("|");
		var vehicleTypes = new Array(types.length);
		for (i = 0; i < types.length; i++)
			vehicleTypes[i] = types[i] == 1;


		var vehiclePayload = [];

		// Initialize all Vehicles at that location
		for (i = 0; i < vehicleTypes.length; i++) {
			if (vehicleTypes[i]) 
				vehiclePayload.push(vehicles.get(Vehicle.vehicleNames[i]));
			else
				vehiclePayload.push(null);
		}

		// Create a new Location object and add it to the list
		let loc = new Location(payload[0], payload[1], payload[2], payload[3], payload[4], vehicleTypes, vehiclePayload);
		locations.push(loc);
		g.addVertex(loc);
		return loc;
	});
}

export const loadPassengers = () => {
	const passengersTxt = fs.readFileSync(path.join(__dirname, '../src/settings/People.txt'), 'utf8');
	const lines = passengersTxt.split('\n').slice(1);   // name,currentLocation,destination,preference,vehiclePreference
	return lines.map((line) => {
		let payload = line.split(",");
		let passenger = new Passenger(payload[0].trim(), g.graph[payload[1]], g.graph[payload[2]], parseInt(payload[3]), payload[4].trim());
		passengers.push(passenger);
		return passenger;
	})
}

export const loadPaths = () => {
	const pathsTxt = fs.readFileSync(path.join(__dirname, '../src/settings/Paths.txt'), 'utf8');
	const lines = pathsTxt.trim().split(/\s*[\r\n]+\s*/g).slice(1);    // startPoint,destPoint
	return lines.map((line) => {
		let payload = line.split(",");
		let from = g.graph[payload[0]];
		let to = g.graph[payload[1]];
		for (let i = 0; i < 6; i++) {
			if (from.vehicleTypes[i] && to.vehicleTypes[i])
				g.addEdge(from, to, getDistance(from,to), from.vehicles[i]);
		}
		return [from,to];
	})
}