package settings;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;


import Graph.Location;
import WorldObjects.*;
import Main.*;

/**
 * @author Ashwin Gokhale.
 */
public class SettingsParser {
	public static void loadLocations(){
		try {
			BufferedReader br = new BufferedReader(new FileReader("./src/settings/Locations.txt"));

			String line = br.readLine();    // Loc_name,Latitude,Longitude,X,Y,vehicleTypes (Aircraft, Bart, Bicycle, Bus, Car, Taxi)

			while ((line = br.readLine()) != null){
				// Split each line into its respective parameters
				String[] payload = line.split(",");

//				// Split vehicle types and parse them based on their values
				String[] types = payload[5].split("\\|");
				boolean[] vehicleTypes = new boolean[types.length];
				for (int i = 0; i < types.length; i++)
					vehicleTypes[i] = types[i].equals("1");


				ArrayList<Vehicle> vehiclePayload = new ArrayList<>(6);

				// Initialize all Vehicles at that location
				for (int i = 0; i < vehicleTypes.length; i++) {
					if (vehicleTypes[i])
						vehiclePayload.add(Vehicle.vehicles.get(Vehicle.vehicleNames.get(i)));
					else
						vehiclePayload.add(null);
				}

				// Create a new Location object and add it to the list
				Location loc = new Location(payload[0], Double.parseDouble(payload[1]), Double.parseDouble(payload[2]), Integer.parseInt(payload[3]), Integer.parseInt(payload[4]) , vehicleTypes, vehiclePayload);
				Visualize.locations.add(loc);
				Visualize.g.addVertex(loc);


			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void createPaths(){
		try{
			BufferedReader br = new BufferedReader(new FileReader("./src/settings/Paths.txt"));

			String line = br.readLine();    // startPoint,destPoint

			while ((line = br.readLine()) != null){
				String[] payload = line.split(",");
				Location from = Visualize.g.getGraph().get(payload[0]);
				Location to = Visualize.g.getGraph().get(payload[1]);
				for (int i = 0; i < 6; i++) {
					if (from.getVehicleTypes()[i] && to.getVehicleTypes()[i])
						Visualize.g.addEdge(from, to, Location.getDistance(from,to), from.getVehicles().get(i));
				}
			}
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	public static void loadPassengers(){
		try{
			BufferedReader br = new BufferedReader(new FileReader("./src/settings/People.txt"));

			String line = br.readLine();    // name,currentLocation,destination,preference,vehiclePreference

			while ((line = br.readLine()) != null){
				String[] payload = line.split(",");
				Visualize.passengers.add(new Passenger(payload[0], Visualize.g.getGraph().get(payload[1]), Visualize.g.getGraph().get(payload[2]), Integer.parseInt(payload[3]), payload[4]));
			}
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	public static void loadVehicles() {
		// Initialize all Vehicles and add to the Vehicle HashMap
		for (int i = 0; i < 6; i++) {
			switch (i) {
				// Aircraft, Bart, Bicycle, Bus, Car, Taxi
				case 0:
					Vehicle.vehicles.put("Aircraft", new Aircraft());
					break;
				case 1:
					Vehicle.vehicles.put("Bart", new Bart());
					break;
				case 2:
					Vehicle.vehicles.put("Bicycle", new Bicycle());
					break;
				case 3:
					Vehicle.vehicles.put("Bus", new Bus());
					break;
				case 4:
					Vehicle.vehicles.put("Car", new Car());
					break;
				case 5:
					Vehicle.vehicles.put("Taxi", new Taxi());
					break;
			}
		}
	}

}
