/**
 * Created by ashwi on 2/13/2017.
 */
const TinyQueue = require('tinyqueue');
const Vehicle = require('./vehicle');
const Passenger = require('./passenger');
const Location = require('./location');

class Graph{
	constructor(params) {
		this.graph = {};
		this.locations = [];
		this.passengers = [];
	}
}

Graph.graph = {}; // Maps name of location to Location object
Graph.locations = [];
Graph.passengers = [];

var addVertex = (node) => {
    Graph.graph[node.name] = node;
};

var containsLocation = (node) => {
    return Graph.graph[node.name] != undefined;
};

var addEdge = (from, to, weight, type) => {
    if (!containsLocation(from))
        Graph.addVertex(from);

    if (!containsLocation(to))
        Graph.addVertex(to);

    from.addNeighbor(to, weight, type);
    to.addNeighbor(from, weight, type);
};



// Implementation of Dijkstra's algorithm
// Computes paths for each Passenger p
var computePaths = (p) => {

	var source = p.currentLoc;

	// Must reset every location distance and previous values upon each function call
	var vals = Object.keys(Graph.graph).map((key) =>{
		return Graph.graph[key];
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
		console.log(Vehicle.vehicles);

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

var getShortestPathTo = (target) => {
	var path = [];
	for (var vertex = target; vertex != null; vertex = vertex.prev)
	path.push(vertex);

	path.reverse();

	// If no possible path, path will be [currentLoc, currentLoc]
	if (path.size() == 1)
		path.push(path[0]);

	return path;
};

module.exports = {
    graph: Graph.graph,
    locations: Graph.locations,
    passengers: Graph.passengers,
    addVertex: addVertex,
    addEdge: addEdge,
    containsLocation: containsLocation,
	computePaths: computePaths,
	getShortestPathTo: getShortestPathTo
};