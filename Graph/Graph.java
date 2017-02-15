package Graph;

import WorldObjects.Passenger;
import WorldObjects.Vehicle;

import java.util.*;

/**
 * Created by Ashwin on 1/28/2017.
 */
public class Graph {
	private HashMap<String, Location> graph;
	private int numVertices;

	public Graph(){
		this.graph = new HashMap<>();
		this.numVertices = 0;
	}

	public Location addVertex(Location node){
		numVertices++;
		if (!graph.containsKey(node.getName()))
			graph.put(node.getName(), node);

		return node;
	}

	public Set<String> getLocationNames(){
		return graph.keySet();
	}

	public HashMap<String, Location> getGraph() {
		return graph;
	}

	private boolean containsLocation(String node){
		return graph.containsKey(node);
	}

	public void addEdge(Location from, Location to, double weight , Vehicle vehicleType){
		if (!containsLocation(from.getName()))
			addVertex(from);

		if (!containsLocation(to.getName()))
			addVertex(to);

		from.addNeighbor(to, weight , vehicleType);
		to.addNeighbor(from, weight , vehicleType);
	}


	// Implementation of Dijkstra's algorithm
	public void computePaths(Passenger p) {

		Location source = p.getCurrentLoc();

		// Must reset every location distance and previous values upon each function call
		for (Location x : graph.values()){
			x.dist = Double.POSITIVE_INFINITY;
			x.prev = null;
		}

		source.dist = 0;
		PriorityQueue<Location> vertexQueue = new PriorityQueue<>();
		vertexQueue.add(source);

		while (!vertexQueue.isEmpty()) {

			// Pop the Location with the least distance
			Location u = vertexQueue.poll();

			// Visit each edge exiting u with the specified vehicle preference
			for (Edge e : u.getAdjacent().get(Vehicle.vehicles.get(p.getVehiclePreference()))) {
				Location v = e.to;
				double alt = u.dist + e.weight;
				if (alt < v.dist) {
					vertexQueue.remove(v);

					v.dist = alt;
					v.prev = u;
					vertexQueue.add(v);
				}
			}
		}
	}

	public static ArrayList<Location> getShortestPathTo (Location target) {
		ArrayList<Location> path = new ArrayList<>();
		for (Location vertex = target; vertex != null; vertex = vertex.prev)
			path.add(vertex);

		Collections.reverse(path);

		// If no possible path, path will be [currentLoc, currentLoc]
		if (path.size() == 1)
			path.add(path.get(0));

		return path;
	}


}



