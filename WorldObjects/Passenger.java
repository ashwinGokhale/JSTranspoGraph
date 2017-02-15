package WorldObjects;

import Graph.Location;

import java.util.ArrayList;

/**
 * @author Ashwin Gokhale.
 */
public class Passenger{
	private String name;
	private Location currentLoc;
	private Location dest;
	private int preference;
	private String vehiclePreference;
	private Vehicle vehicle;
	private ArrayList<Location> path;
	double cost;

	public Passenger(String name, Location currentLoc, Location dest, int preference, String vehiclePreference) {
		this.name = name;
		this.currentLoc = currentLoc;
		this.dest = dest;
		this.preference = preference;   // 1 for shortest time, 2 for lowest cost
		this.vehiclePreference = vehiclePreference;
	}

	public String getName() {
		return name;
	}

	public Location getCurrentLoc() {
		return currentLoc;
	}

	public Location getDest() {
		return dest;
	}

	public int getPreference() {
		return preference;
	}

	public String getVehiclePreference() {
		return vehiclePreference;
	}

	public ArrayList<Location> getPath() {return path;}

	public void setPath(ArrayList<Location> path) {
		this.path = path;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCurrentLoc(Location currentLoc) {
		this.currentLoc = currentLoc;
	}

	public void setDest(Location dest) {
		this.dest = dest;
	}

	public void setPreference(int preference) {
		this.preference = preference;
	}

	public void setVehiclePreference(String vehiclePreference) {
		this.vehiclePreference = vehiclePreference;
	}

	public void createVehicle(){

	}

	public double calculateCost(){
		// typeOfCost: 1 is fixed (regardless of time or distance), 2 is fixed + a factor of distance  (e.g. a Taxi cab),
		// and 3 is based on fraction of distance (e.g. a Car where unitCost is expressed as cost/gallon)

		double distance = 0;
		for (int i = 0; i < path.size()-1;i++) distance += Location.getHaversineDistance(path.get(i), path.get(i+1));

		cost = Vehicle.vehicles.get(vehiclePreference).calculateCostOfTravel(distance);

		return cost;

	}
}
