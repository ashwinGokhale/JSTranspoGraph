/**
 * Created by ashwi on 2/13/2017.
 */

import TinyQueue from 'tinyqueue'
//const TinyQueue = require('tinyqueue');
import { vehicles } from '../settings/settings'

export default class Graph{
	constructor() {
		this.graph = {};
	}

	addVertex(node){
		this.graph[node.name] = node;
	};

	containsLocation(node) {
		return this.graph[node.name] != undefined;
	};

	addEdge(from, to, weight, type) {
		if (!this.containsLocation(from))
			this.addVertex(from);

		if (!this.containsLocation(to))
			this.addVertex(to);

		from.addNeighbor(to, weight, type);
		to.addNeighbor(from, weight, type);
	};

	// Implementation of Dijkstra's algorithm
	// Computes paths for each Passenger p
	computePaths(p) {

		var source = p.currentLoc;

		// Must reset every location distance and previous values upon each function call
		Object.values(this.graph).forEach((x) => {
			x.dist = Infinity;
			x.prev = null;
		});
		

		source.dist = 0;
		var vertexQueue = new TinyQueue([], (a,b) => {
			return a && b ? (a.dist < b.dist ? -1 : a.dist > b.dist ? 1: 0): 0;
		});
		vertexQueue.push(source);

		while (vertexQueue.peek()) {

			// Pop the Location with the least distance
			let u = vertexQueue.pop();

			// Visit each edge exiting u with the specified vehicle preference
			let pref = p.vehiclePreference;
			let adj = u.adjacent;
			adj.get(vehicles.get(p.vehiclePreference)).forEach((e) => {
				let v = e.to;	// Location v
				let alt = u.dist + e.weight;	// Calculate alternative cost (double)
				if (alt < v.dist) {
					// Remove v from priority queue
					vertexQueue.data.filter((loc) => loc == v);

					v.dist = alt;
					v.prev = u;
					vertexQueue.push(v);
				}
			});
		}
	};
};

export const getShortestPathTo = (target) => {
	var path = [];
	for (var vertex = target; vertex != null; vertex = vertex.prev)
	path.push(vertex);

	path.reverse();

	// If no possible path, path will be [currentLoc, currentLoc]
	if (path.length == 1)
		path.push(path[0]);

	return path;
};