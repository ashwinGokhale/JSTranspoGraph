package Graph;

import WorldObjects.Vehicle;

import java.util.ArrayList;
import java.util.HashMap;


/**
 * Created by Ashwin on 1/28/2017.
 */
public class Location implements Comparable<Location>{
	private String name;
	private int x;
	private int y;
	private double lat;
	private double lon;
	double dist = Double.POSITIVE_INFINITY;
	Location prev;
	private boolean[] vehicleTypes; // Aircraft, Bart, Bicycle, Bus, Car, Taxi
	private ArrayList<Vehicle> vehicles;
	private HashMap<Vehicle, ArrayList<Edge>> adjacent;  // Maps Vehicle type to ArrayList of adjacent Locations as Edge objects

	public Location(String name,double latitude,double longitude, int x, int y  , boolean[] vehicleTypes, ArrayList<Vehicle> vehicles) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.vehicleTypes = vehicleTypes;
		this.vehicles = vehicles;
		this.lat = latitude;
		this.lon = longitude;

		// Initialize Adjacency HashMap and map each vehicle to an ArrayList of Edges
		this.adjacent = new HashMap<>();
		for (Vehicle vehicle : vehicles)
			if (vehicle != null)
				adjacent.put(vehicle, new ArrayList<>());

	}

	public String getName() {
		return name;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	public boolean[] getVehicleTypes() {return vehicleTypes;}

	public ArrayList<Vehicle> getVehicles() {
		return vehicles;
	}

	public HashMap<Vehicle, ArrayList<Edge>> getAdjacent() {return adjacent;}

	public double getLat() {
		return lat;
	}

	public double getLon() {
		return lon;
	}

	void addNeighbor(Location neighbor, double weight, Vehicle vehicle){
		Edge e = new Edge(this, neighbor, weight , vehicle);
		if (!adjacent.get(vehicle).contains(e))
			adjacent.get(vehicle).add(e);
	}

	public static double getDistance(Location loc1, Location loc2){
		return Math.sqrt(Math.pow(loc2.getX() - loc1.getX(), 2) + Math.pow(loc2.getY() - loc1.getY(), 2));
	}

	public static double getHaversineDistance(Location l1, Location l2){
		double lat1 = l1.getLat();
		double lon1 = l1.getLon();
		double lat2 = l2.getLat();
		double lon2 = l2.getLon();


		int R = 6371; // metres
		double φ1 = Math.toRadians(lat1);
		double φ2 = Math.toRadians(lat2);
		double Δφ = Math.toRadians(lat2-lat1);
		double Δλ = Math.toRadians(lon2-lon1);

		double a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
				Math.cos(φ1) * Math.cos(φ2) *
						Math.sin(Δλ/2) * Math.sin(Δλ/2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		double d = R * c;

		return d * 0.621371;
	}

	public int compareTo(Location other)
	{
		return Double.compare(dist, other.dist);
	}

	public String toString() {
		return String.format("%s", getName());
	}

}
