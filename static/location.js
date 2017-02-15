/**
 * Created by ashwi on 2/13/2017.
 */

function Location(name, latitude, longitude, x, y, vehicleTypes, vehicles) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.vehicleTypes = vehicleTypes;
	this.vehicles = vehicles;
	this.lat = latitude;
	this.lon = longitude;

	// Initialize Adjacency HashMap and map each vehicle to an ArrayList of Edges
	this.adjacent = {};
	for (var i = 0; i < this.vehicles.length; i++) {
		if (this.vehicles[i] != null)
			this.adjacent[this.vehicles[i].name] = [];
	}
}

Location.prototype.addNeighbor = function (neighbor, weight, vehicle) {
	var e = new Edge(this, neighbor, weight , vehicle);
	if (this.adjacent[vehicle] != undefined && !this.adjacent[vehicle].contains(e))
		this.adjacent[vehicle].push(e);
};

Location.getDistance = function (loc1, loc2){
    return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2));
};

Location.prototype.getHaversineDistance = function (l1, l2){
    var lat1 = l1.lat;
    var lon1 = l1.lon;
    var lat2 = l2.lat;
    var lon2 = l2.lon;

    var R = 6371; // meters

    var φ1 = Math.PI / 180 * (lat1);
    var φ2 = Math.PI / 180 * (lat2);
    var Δφ = Math.PI / 180 * (lat2-lat1);
    var Δλ = Math.PI / 180 * (lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    return d * 0.621371;
};

module.exports = Location;