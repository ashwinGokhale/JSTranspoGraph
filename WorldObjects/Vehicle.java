package WorldObjects;

import Graph.Location;
import Main.Visualize;

import java.util.*;

/**
 * @author Ashwin Gokhale.
 */
public class Vehicle{
	public static HashMap<String,Vehicle> vehicles = new HashMap<>();
	public static ArrayList<String> vehicleNames = new ArrayList<>(Arrays.asList("Aircraft", "Bart", "Bicycle", "Bus", "Car", "Taxi"));
	private int speedOfTravel;
	private double unitCost;
	private int typeOfCost;
	private int waitTime;
	private Location currentLocation;

	public Vehicle(int speedOfTravel, int waitTime, double unitCost, int typeOfCost) {
		this.speedOfTravel = speedOfTravel;
		this.waitTime = waitTime;
		this.unitCost = unitCost;
		this.typeOfCost = typeOfCost;
	}

	public int getSpeedOfTravel() {
		return speedOfTravel;
	}

	public double getUnitCost() {
		return unitCost;
	}

	public int getTypeOfCost() {
		return typeOfCost;
	}

	public int getWaitTime() {
		return waitTime;
	}

	public Location getCurrentLocation() {
		return currentLocation;
	}

	public void setCurrentLocation(Location currentLocation) {
		this.currentLocation = currentLocation;
	}

	public String toString() {
		return "Current Location: " + getCurrentLocation();
	}

	public double calculateCostOfTravel(double distance){
		// typeOfCost: 1 is fixed (regardless of time or distance), 2 is fixed + a factor of distance  (e.g. a Taxi cab),
		// and 3 is based on fraction of distance (e.g. a Car where unitCost is expressed as cost/gallon)

		switch (typeOfCost){
			case 1:
				return unitCost; // Fixed Cost

			case 2:
				return unitCost + (distance * 2); // Fixed Cost + $2 per mile

			case 3:
				return (unitCost / 25) * distance; // Cost per gallon per mile. $3 a gallon and 25 mpg

			default:
				return 0.0;
		}
	}
}
