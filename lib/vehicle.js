/**
 * Created by ashwin on 2/25/17.
 */
function Vehicle(name, speedOfTravel, waitTime, unitCost, typeOfCost) {

    this.name = name;
    this.speedOfTravel = speedOfTravel;
    this.waitTime = waitTime;
    this.unitCost = unitCost;
    this.typeOfCost = typeOfCost;
    this.location = undefined;
}

Vehicle.vehicles = {};
Vehicle.vehicleNames = ["Aircraft", "Bart", "Bicycle", "Bus", "Car", "Taxi"];

var setVehicle = (name, speedOfTravel, waitTime, unitCost, typeOfCost) => {
    Vehicle.vehicles[name] = new Vehicle(name, speedOfTravel, waitTime, unitCost, typeOfCost);
};

var getVehicle = (name) => {
    return Vehicle.vehicles[name];
};

Vehicle.prototype.toString = function() {
    return this.name;
};

module.exports = {
    vehicleNames: Vehicle.vehicleNames,
    setVehicle: setVehicle,
    getVehicle: getVehicle,
    getVehicles: () => {
        // Initialize all Vehicles and add to the Vehicle HashMap

        for (let i = 0; i < 6; i++) {
            switch (i) {
                // Aircraft, Bart, Bicycle, Bus, Car, Taxi
                case 0:
                    setVehicle("Aircraft", 575, 120, 400, 1);
                    break;
                case 1:
                    setVehicle("Bart", 60, 10, 8, 1);
                    break;
                case 2:
                    setVehicle("Bicycle", 10, 0, 0, 1);
                    break;
                case 3:
                    setVehicle("Bus", 30, 10, 0.5, 1);
                    break;
                case 4:
                    setVehicle("Car", 50, 0, 3, 3);
                    break;
                case 5:
                    setVehicle("Taxi", 50, 10, 1.5, 2);
                    break;
            }
        }

        return Vehicle.vehicles;
    }
};