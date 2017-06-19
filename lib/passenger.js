const fs = require('fs');
const path = require('path');



function Passenger(name, currentLoc, dest, preference, vehiclePreference) {


    this.name = name;
    this.currentLoc = currentLoc;
    this.dest = dest;
    this.preference = preference;   // 1 for shortest time, 2 for lowest cost
    this.vehiclePreference = vehiclePreference;
}

module.exports = {
    getPassengers: () => {
        const Graph = require('./graph');
        const passengersTxt = fs.readFileSync(path.resolve(__dirname, '../settings/People.txt'), 'utf8');
        const lines = passengersTxt.split('\n').slice(1);   // name,currentLocation,destination,preference,vehiclePreference
        return lines.map((line) => {
            var payload = line.split(",");
            var passenger = new Passenger(payload[0], Graph.graph[payload[1]], Graph.graph[payload[2]], parseInt(payload[3]), payload[4]);
            Graph.passengers.push(passenger);
            return passenger;
        })
    }
};
