/**
 * Created by ashwin on 2/25/17.
 */

export default class Vehicle {
    static vehicleNames = ["Aircraft", "Bart", "Bicycle", "Bus", "Car", "Taxi"];

    constructor(name, speedOfTravel, waitTime, unitCost, typeOfCost) {
        this.name = name;
        this.speedOfTravel = speedOfTravel;
        this.waitTime = waitTime;
        this.unitCost = unitCost;
        this.typeOfCost = typeOfCost;
        this.location = undefined;
    }

    toString = () => {
        return this.name;
    };

    calculateCostOfTravel(distance){
		// typeOfCost: 1 is fixed (regardless of time or distance), 2 is fixed + a factor of distance  (e.g. a Taxi cab),
		// and 3 is based on fraction of distance (e.g. a Car where unitCost is expressed as cost/gallon)

		switch (this.typeOfCost){
			case 1:
				return this.unitCost; // Fixed Cost

			case 2:
				return this.unitCost + (distance * 2); // Fixed Cost + $2 per mile

			case 3:
				return (this.unitCost / 25) * distance; // Cost per gallon per mile. $3 a gallon and 25 mpg

			default:
				return 0.0;
		}
	}

}