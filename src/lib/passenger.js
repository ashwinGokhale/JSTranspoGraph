const path = require('path');

export default class Passenger {
    constructor(name, currentLoc, dest, preference, vehiclePreference) {
        this.name = name;
        this.currentLoc = currentLoc;
        this.dest = dest;
        this.preference = preference;   // 1 for shortest time, 2 for lowest cost
        this.vehiclePreference = vehiclePreference;
    }
}
