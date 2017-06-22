/**
 * Created by ashwi on 2/13/2017.
 */

import TinyQueue from 'tinyqueue'
//const TinyQueue = require('tinyqueue');

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
		var vals = Object.keys(this.graph).map((key) =>{
			return this.graph[key];
		});

		vals.forEach((x) =>{
			x.dist = Infinity;
			x.prev = null;
		});

		source.dist = 0;
		var vertexQueue = new TinyQueue();
		vertexQueue.push(source);

		while (vertexQueue.peek()) {

			// Pop the Location with the least distance
			var u = vertexQueue.pop();

			// Visit each edge exiting u with the specified vehicle preference
			let pref = p.vehiclePreference;
			let adj = u.adjacent;
			adj[pref].forEach((e) => {
				var v = e.to;	// Location v
				var alt = u.dist + e.weight;	// Calculate alternative cost (double)
				if (alt < v.dist) {

					// Remove v from priority queue
					var tempList = [];
					var toRemove = vertexQueue.pop();
					tempList.push(toRemove);
					while(toRemove != v && vertexQueue.peek()){
						toRemove = vertexQueue.pop();

						if (toRemove != v)
							tempList.push(toRemove);
					}

					// Add items back to the queue
					tempList.forEach((item) => {
						vertexQueue.push(item);
					});

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