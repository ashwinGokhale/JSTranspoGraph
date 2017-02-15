/**
 * Created by ashwi on 2/13/2017.
 */
function Edge(from, to, weight, vehicleType) {
    this.from = from;
    this.to = to;
    this.weight = weight;
    this.vehicleType = vehicleType;
}

Edge.prototype.toString = function toString(){
    return ("(" + this.from.name + " -> "+ this.to.name + ":\tDistance: " + this.weight + "\tVehicle Type: " + this.vehicleType + "\n)");
};

module.exports = Edge;