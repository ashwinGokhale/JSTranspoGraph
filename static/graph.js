/**
 * Created by ashwi on 2/13/2017.
 */
function Graph() {
	this.graph = {};	// Maps name of location to Location object
}

Graph.prototype.addVertex = function (node) {
	this.graph[node.name] = node;
};

Graph.prototype.addEdge = function(from, to, weight, type){
	if (!this.containsLocation(from))
		this.addVertex(from);

	if (!this.containsLocation(to))
		this.addVertex(to);

	from.addNeighbor(to, weight , type);
	to.addNeighbor(from, weight , type);
};

Graph.prototype.containsLocation = function (node) {
	return this.graph[node.name] != undefined;
};

// Implementation of Dijkstra's algorithm
// public void computePaths(Passenger p) {
//
// 	Location source = p.getCurrentLoc();
//
// 	// Must reset every location distance and previous values upon each function call
// 	for (Location x : graph.values()){
// 		x.dist = Double.POSITIVE_INFINITY;
// 		x.prev = null;
// 	}
//
// 	source.dist = 0;
// 	PriorityQueue<Location> vertexQueue = new PriorityQueue<>();
// 	vertexQueue.add(source);
//
// 	while (!vertexQueue.isEmpty()) {
//
// 		// Pop the Location with the least distance
// 		Location u = vertexQueue.poll();
//
// 		// Visit each edge exiting u with the specified vehicle preference
// 		for (Edge e : u.getAdjacent().get(Vehicle.vehicles.get(p.getVehiclePreference()))) {
// 			Location v = e.to;
// 			double alt = u.dist + e.weight;
// 			if (alt < v.dist) {
// 				vertexQueue.remove(v);
//
// 				v.dist = alt;
// 				v.prev = u;
// 				vertexQueue.add(v);
// 			}
// 		}
// 	}
// }
//
// public static ArrayList<Location> getShortestPathTo (Location target) {
// 	ArrayList<Location> path = new ArrayList<>();
// 	for (Location vertex = target; vertex != null; vertex = vertex.prev)
// 	path.add(vertex);
//
// 	Collections.reverse(path);
//
// 	// If no possible path, path will be [currentLoc, currentLoc]
// 	if (path.size() == 1)
// 		path.add(path.get(0));
//
// 	return path;
// }

module.exports = Graph;
