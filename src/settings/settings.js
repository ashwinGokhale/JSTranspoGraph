import Vehicle from '../lib/vehicle';
import Location, { getDistance } from '../lib/location';
import Passenger from '../lib/passenger';
import Graph from '../lib/graph';
import fs from 'fs';
import path from 'path';
export let g = new Graph();
export let locations = [];
export let passengers = [];
export let vehicles = new Map();

export const loadVehicles = () => {
	require(path.join(__dirname, '../src/settings/Vehicles.json')).map(line =>
		vehicles.set(line.type, new Vehicle(line.name, line.speed, line.wait, line.unitCost, line.costType))
	);

	return vehicles;
}

export const loadLocations = () => {
	return require(path.join(__dirname, '../src/settings/Locations.json')).map((line) => {
		let vehiclePayload = [];
		
		for(let i = 0; i < line.vehicleTypes.length; i++)
			line.vehicleTypes[i] ? vehiclePayload.push(vehicles.get(Vehicle.vehicleNames[i])) : vehiclePayload.push(null);

		let loc = new Location(line.name, line.latitude, line.longitude, line.x, line.y, line.vehicleTypes, vehiclePayload);
		locations.push(loc);
		g.addVertex(loc);
		return loc;
	});
}

export const loadPassengers = () => {
	return require(path.join(__dirname, '../src/settings/People.json')).map((line) => {
		let passenger = new Passenger(line.name, g.graph[line.currentLocation], g.graph[line.destination], line.preference, line.vehiclePreference);
		passengers.push(passenger);
		return passenger;
	});
}

export const loadPaths = () => {
	return require(path.join(__dirname, '../src/settings/Paths.json')).map((line) => {
		let from = g.graph[line.from];
		let to = g.graph[line.to];
		for (let i = 0; i < 6; i++) {
			if (from.vehicleTypes[i] && to.vehicleTypes[i])
				g.addEdge(from, to, getDistance(from,to), from.vehicles[i]);
		}
		return [from,to];
	});
}