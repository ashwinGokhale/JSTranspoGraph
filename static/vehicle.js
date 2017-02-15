/**
 * Created by Ashwin on 2/14/2017.
 */

function Vehicle(name, speedOfTravel, waitTime, unitCost, typeOfCost) {
    this.name = name;
    this.speedOfTravel = speedOfTravel;
    this.waitTime = waitTime;
    this.unitCost = unitCost;
    this.typeOfCost = typeOfCost;
    this.location = undefined;
}

Vehicle.prototype.toString = function () {
    return this.name;
};

module.exports = Vehicle;
