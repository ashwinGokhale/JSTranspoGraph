/**
 * Created by Ashwin on 2/14/2017.
 */
var fs = require('fs');
require('../ctrls')();

module.exports = function() {

    this.loadVehicles = function(callback) {
        // Initialize all Vehicles and add to the Vehicle HashMap
        Vehicle.vehicles = {};
        Vehicle.vehicleNames = ["Aircraft", "Bart", "Bicycle", "Bus", "Car", "Taxi"];
        for (var i = 0; i < 6; i++) {
            switch (i) {
                // Aircraft, Bart, Bicycle, Bus, Car, Taxi
                case 0:
                    Vehicle.vehicles["Aircraft"] = new Vehicle("Aircraft", 575, 120, 400, 1);
                    break;
                case 1:
                    Vehicle.vehicles["Bart"] = new Vehicle("Bart", 60, 10, 8, 1);
                    break;
                case 2:
                    Vehicle.vehicles["Bicycle"] = new Vehicle("Bicycle",10, 0, 0, 1);
                    break;
                case 3:
                    Vehicle.vehicles["Bus"] =  new Vehicle("Bus",30, 10, 0.5, 1);
                    break;
                case 4:
                    Vehicle.vehicles["Car"] = new Vehicle("Car",50, 0, 3, 3);
                    break;
                case 5:
                    Vehicle.vehicles["Taxi"] = new Vehicle("Taxi",50, 10, 1.5, 2);
                    break;
            }
        }
        if (callback)
            callback();
    };

    this.loadLocations = function(callback) {
        App.locations = [];
        App.g = new Graph();

        var filename = "./settings/Locations.txt";
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) throw err;
            var lines = data.split("\r\n");    // Loc_name,Latitude,Longitude,X,Y,vehicleTypes (Aircraft, Bart, Bicycle, Bus, Car, Taxi)

            for (var j = 1; j < lines.length; j++) {
                var line = lines[j];
                //console.log(line)
                // Split each line into its respective parameters
                var payload = line.split(",");

//				// Split vehicle types and parse them based on their values
                var types = payload[5].split("|");
                var vehicleTypes = new Array(types.length);
                var i;
                for (i = 0; i < types.length; i++)
                    vehicleTypes[i] = types[i] === "1";


                var vehiclePayload = [];

                // Initialize all Vehicles at that location
                for (i = 0; i < vehicleTypes.length; i++) {
                    if (vehicleTypes[i]) {
                        var v = Vehicle.vehicles[Vehicle.vehicleNames[i]];
                        vehiclePayload.push(v);
                    }

                    else
                    vehiclePayload.push(null);
                }

                // Create a new Location object and add it to the list
                var loc = new Location(payload[0], parseFloat(payload[1]), parseFloat(payload[2]), parseInt(payload[3]), parseInt(payload[4]), vehicleTypes, vehiclePayload);
                App.locations.push(loc);
                App.g.addVertex(loc);
            }

        });

        if (callback)
            callback();
    };



    this.createPaths = function (callback) {
        var filename = "./settings/Paths.txt";
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) throw err;
            var lines = data.split("\r\n");    // Loc_name,Latitude,Longitude,X,Y,vehicleTypes (Aircraft, Bart, Bicycle, Bus, Car, Taxi)

            for (var j = 1; j < lines.length; j++) {
                var line = lines[j];
                var payload = line.split(","); // startPoint,destPoint

                var from = App.g.graph[payload[0]];
                var to = App.g.graph[payload[1]];
                for (var i = 0; i < 6; i++) {
                    if (from.vehicleTypes[i] && to.vehicleTypes[i])
                        App.g.addEdge(from, to, Location.getDistance(from,to), from.vehicleTypes[i]);
                }
            }

            console.log(App.g.graph);
        });

        if (callback)
            callback();
    }
};
/*

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


*/
