/**
 * Created by ashwin on 2/25/17.
 */

let bg;
let locations;
let vehicles;
let paths;
let passengers;

function setup() {
    createCanvas(1700,900);
    const Vehicle = require('./lib/vehicle.js');
    const Location = require('./lib/location');
    const Passenger = require('./lib/passenger');
    const Edge = require('./lib/edge');
    const Graph = require('./lib/graph');

    vehicles = Vehicle.getVehicles();
    locations = Location.getLocations();
    paths = Edge.createPaths();
    passengers = Passenger.getPassengers();

    //console.log(passengers[0]);
    //Graph.computePaths(passengers[0]);

    //var p = Graph.getShortestPathTo(passengers[0].dest);
    //console.log(p);

    bg = loadImage("./Main/Map.png");
}

function draw() {
    image(bg, 50, 50);

    // Map all locations
    locations.forEach((loc) => {
        fill(255, 0, 0);
        ellipse(loc.x, loc.y, 20,20);

        // San Ramon and Dublin are not on the Google Maps image
        if (loc.name == ("San Ramon") || loc.name == ("Dublin")) {
            fill(0);
            textSize(13);
            text(loc.name, loc.x - 30, loc.y - 20);
        }

        // For each adjacent location, draw a line between them
        loc.vehicles.forEach((vehicle) => {
            console.log(vehicle);
            if (vehicle != null) {
                loc.adjacent[vehicle.name].forEach((e) => {
                    line(loc.x, loc.y, e.to.x, e.to.y);
                });
            }
        })
    });
}
