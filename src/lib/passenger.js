import { getHaversineDistance } from './location';
import { vehicles } from '../settings/settings';

export default class Passenger {
    constructor(name, currentLoc, dest, preference, vehiclePreference) {
        this.name = name;
        this.currentLoc = currentLoc;
        this.dest = dest;
        this.preference = preference;   // 1 for shortest time, 2 for lowest cost
        this.vehiclePreference = vehiclePreference;
        this.path = [];
        this.cost = 0;
    }

    setPath (path) {
        this.path = path;
    }

    calculateCost(){
		// typeOfCost: 1 is fixed (regardless of time or distance), 2 is fixed + a factor of distance  (e.g. a Taxi cab),
		// and 3 is based on fraction of distance (e.g. a Car where unitCost is expressed as cost/gallon)

		let distance = 0;
		for (let i = 0; i < this.path.length -1;i++) distance += getHaversineDistance(this.path[i], this.path[i+1]);

		this.cost = vehicles.get(this.vehiclePreference).calculateCostOfTravel(distance);

		return this.cost;

	}
}
