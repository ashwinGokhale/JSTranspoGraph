package Graph;

import WorldObjects.Vehicle;

/**
 * Created by Ashwin on 2/3/2017.
 */
public class Edge {
	private Location from;
	public Location to;
	double weight;
	private Vehicle vehicleType;

	Edge(Location from, Location to, double weight, Vehicle vehicleType) {
		this.from = from;
		this.to = to;
		this.weight = weight;
		this.vehicleType = vehicleType;
	}

	public String toString() {
		return String.format("(%s -> %s):\tDistance: %.02f\tVehicle Type: %s\n", from.getName(), to.getName(), weight, vehicleType);
	}
}
