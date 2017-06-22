(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var electron = require('electron');
var TinyQueue = _interopDefault(require('tinyqueue'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var p5 = _interopDefault(require('p5'));

// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

var Menu = electron.remote.Menu;
var MenuItem = electron.remote.MenuItem;

var isAnyTextSelected = function isAnyTextSelected() {
  return window.getSelection().toString() !== '';
};

var cut = new MenuItem({
  label: 'Cut',
  click: function click() {
    document.execCommand('cut');
  }
});

var copy = new MenuItem({
  label: 'Copy',
  click: function click() {
    document.execCommand('copy');
  }
});

var paste = new MenuItem({
  label: 'Paste',
  click: function click() {
    document.execCommand('paste');
  }
});

var normalMenu = new Menu();
normalMenu.append(copy);

var textEditingMenu = new Menu();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);

document.addEventListener('contextmenu', function (event) {
  switch (event.target.nodeName) {
    case 'TEXTAREA':
    case 'INPUT':
      event.preventDefault();
      textEditingMenu.popup(electron.remote.getCurrentWindow());
      break;
    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        normalMenu.popup(electron.remote.getCurrentWindow());
      }
  }
}, false);

// Convenient way for opening links in external browser, not in the app.
// Useful especially if you have a lot of links to deal with.
//
// Usage:
//
// Every link with class ".js-external-link" will be opened in external browser.
// <a class="js-external-link" href="http://google.com">google</a>
//
// The same behaviour for many links can be achieved by adding
// this class to any parent tag of an anchor tag.
// <p class="js-external-link">
//    <a href="http://google.com">google</a>
//    <a href="http://bing.com">bing</a>
// </p>

var supportExternalLinks = function supportExternalLinks(event) {
  var href = void 0;
  var isExternal = false;

  var checkDomElement = function checkDomElement(element) {
    if (element.nodeName === 'A') {
      href = element.getAttribute('href');
    }
    if (element.classList.contains('js-external-link')) {
      isExternal = true;
    }
    if (href && isExternal) {
      electron.shell.openExternal(href);
      event.preventDefault();
    } else if (element.parentElement) {
      checkDomElement(element.parentElement);
    }
  };

  checkDomElement(event.target);
};

document.addEventListener('click', supportExternalLinks, false);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * Created by ashwin on 2/25/17.
 */

var Vehicle = function Vehicle(name, speedOfTravel, waitTime, unitCost, typeOfCost) {
    var _this = this;

    classCallCheck(this, Vehicle);

    this.toString = function () {
        return _this.name;
    };

    this.name = name;
    this.speedOfTravel = speedOfTravel;
    this.waitTime = waitTime;
    this.unitCost = unitCost;
    this.typeOfCost = typeOfCost;
    this.location = undefined;
};

// module.exports = {
//     vehicleNames: Vehicle.vehicleNames,
//     setVehicle: setVehicle,
//     getVehicle: getVehicle,
//     getVehicles: () => {
//         // Initialize all Vehicles and add to the Vehicle HashMap

//         for (let i = 0; i < 6; i++) {
//             switch (i) {
//                 // Aircraft, Bart, Bicycle, Bus, Car, Taxi
//                 case 0:
//                     setVehicle("Aircraft", 575, 120, 400, 1);
//                     break;
//                 case 1:
//                     setVehicle("Bart", 60, 10, 8, 1);
//                     break;
//                 case 2:
//                     setVehicle("Bicycle", 10, 0, 0, 1);
//                     break;
//                 case 3:
//                     setVehicle("Bus", 30, 10, 0.5, 1);
//                     break;
//                 case 4:
//                     setVehicle("Car", 50, 0, 3, 3);
//                     break;
//                 case 5:
//                     setVehicle("Taxi", 50, 10, 1.5, 2);
//                     break;
//             }
//         }

//         return Vehicle.vehicles;
//     }
// };


Vehicle.vehicleNames = ["Aircraft", "Bart", "Bicycle", "Bus", "Car", "Taxi"];

/**
 * Created by ashwi on 2/13/2017.
 */

//const TinyQueue = require('tinyqueue');

var Graph = function () {
	function Graph() {
		classCallCheck(this, Graph);

		this.graph = {};
	}

	createClass(Graph, [{
		key: 'addVertex',
		value: function addVertex(node) {
			this.graph[node.name] = node;
		}
	}, {
		key: 'containsLocation',
		value: function containsLocation(node) {
			return this.graph[node.name] != undefined;
		}
	}, {
		key: 'addEdge',
		value: function addEdge(from, to, weight, type) {
			if (!this.containsLocation(from)) this.addVertex(from);

			if (!this.containsLocation(to)) this.addVertex(to);

			from.addNeighbor(to, weight, type);
			to.addNeighbor(from, weight, type);
		}
	}, {
		key: 'computePaths',


		// Implementation of Dijkstra's algorithm
		// Computes paths for each Passenger p
		value: function computePaths(p) {
			var _this = this;

			var source = p.currentLoc;

			// Must reset every location distance and previous values upon each function call
			var vals = Object.keys(this.graph).map(function (key) {
				return _this.graph[key];
			});

			vals.forEach(function (x) {
				x.dist = Infinity;
				x.prev = null;
			});

			source.dist = 0;
			var vertexQueue = new TinyQueue();
			vertexQueue.push(source);

			while (vertexQueue.peek()) {

				// Pop the Location with the least distance
				var u = vertexQueue.pop();

				// Visit each edge exiting u with the specified vehicle preference
				var pref = p.vehiclePreference;
				var adj = u.adjacent;
				adj[pref].forEach(function (e) {
					var v = e.to; // Location v
					var alt = u.dist + e.weight; // Calculate alternative cost (double)
					if (alt < v.dist) {

						// Remove v from priority queue
						var tempList = [];
						var toRemove = vertexQueue.pop();
						tempList.push(toRemove);
						while (toRemove != v && vertexQueue.peek()) {
							toRemove = vertexQueue.pop();

							if (toRemove != v) tempList.push(toRemove);
						}

						// Add items back to the queue
						tempList.forEach(function (item) {
							vertexQueue.push(item);
						});

						v.dist = alt;
						v.prev = u;
						vertexQueue.push(v);
					}
				});
			}
		}
	}]);
	return Graph;
}();



var getShortestPathTo = function getShortestPathTo(target) {
	var path$$1 = [];
	for (var vertex = target; vertex != null; vertex = vertex.prev) {
		path$$1.push(vertex);
	}path$$1.reverse();

	// If no possible path, path will be [currentLoc, currentLoc]
	if (path$$1.length == 1) path$$1.push(path$$1[0]);

	return path$$1;
};

/**
 * Created by ashwin on 2/25/17.
 */

var Edge = function Edge(from, to, weight, vehicleType) {
    classCallCheck(this, Edge);

    this.from = from;
    this.to = to;
    this.weight = weight;
    this.vehicleType = vehicleType;
};

var path$1 = require('path');

var Location = function Location(name, latitude, longitude, x, y, vehicleTypes, vehicles) {
    var _this = this;

    classCallCheck(this, Location);

    this.addNeighbor = function (neighbor, weight, vehicle) {
        var e = new Edge(_this, neighbor, weight, vehicle);
        if (_this.adjacent[vehicle.name] != undefined && !_this.adjacent[vehicle.name].includes(e)) {
            _this.adjacent[vehicle.name].push(e);
        }
    };

    this.name = name;
    this.x = x;
    this.y = y;
    this.vehicleTypes = vehicleTypes;
    this.vehicles = vehicles;
    this.lat = latitude;
    this.lon = longitude;

    // Initialize Adjacency HashMap and map each vehicle to an ArrayList of Edges
    this.adjacent = {};
    vehicles.forEach(function (payload) {
        if (payload) {
            _this.adjacent[payload.name] = [];
        }
    });
};

var getDistance = function getDistance(loc1, loc2) {
    return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2));
};



// module.exports = {
//     getLocations: () => {
//         const locationsTxt = fs.readFileSync(path.resolve(__dirname, '../settings/Locations.txt'), 'utf8');
//         const lines = locationsTxt.split('\n').slice(1);
//         return lines.map((line) => {
//             let loc = new Location(line);
//             // Create a new Location object and add it to the list
//             console.log('Graph: ')
//             console.log(Graph.locations);
//             Graph.locations.push(loc);
//             Graph.addVertex(loc);
//             return loc;
//         })
//     },
//     getDistance: getDistance
// };

var path$2 = require('path');

var Passenger = function Passenger(name, currentLoc, dest, preference, vehiclePreference) {
    classCallCheck(this, Passenger);

    this.name = name;
    this.currentLoc = currentLoc;
    this.dest = dest;
    this.preference = preference; // 1 for shortest time, 2 for lowest cost
    this.vehiclePreference = vehiclePreference;
};

//import Edge from '../lib/edge';
var g = new Graph();
var locations = [];
var passengers = [];
var vehicles = [];

var loadVehicles = function loadVehicles() {
	// Initialize all Vehicles and add to the Vehicle HashMap
	for (var i = 0; i < 6; i++) {
		switch (i) {
			// Aircraft, Bart, Bicycle, Bus, Car, Taxi
			case 0:
				vehicles["Aircraft"] = new Vehicle('Aircraft', 575, 120, 400, 1);
				break;
			case 1:
				vehicles["Bart"] = new Vehicle("Bart", 60, 10, 8, 1);
				break;
			case 2:
				vehicles["Bicycle"] = new Vehicle("Bicycle", 10, 0, 0, 1);
				break;
			case 3:
				vehicles["Bus"] = new Vehicle("Bus", 30, 10, 0.5, 1);
				break;
			case 4:
				vehicles["Car"] = new Vehicle("Car", 50, 0, 3, 3);
				break;
			case 5:
				vehicles["Taxi"] = new Vehicle("Taxi", 50, 10, 1.5, 2);
				break;
		}
	}

	return vehicles;
};

var loadLocations = function loadLocations() {
	var locationsTxt = fs.readFileSync(path.join(__dirname, '../src/settings/Locations.txt'), 'utf8');
	var lines = locationsTxt.split('\n').slice(1);

	return lines.map(function (line) {
		var i = void 0;

		// Split each line into its respective parameters
		var payload = line.split(",");

		// // Split vehicle types and parse them based on their values
		var types = payload[5].split("|");
		var vehicleTypes = new Array(types.length);
		for (i = 0; i < types.length; i++) {
			vehicleTypes[i] = types[i] === "1";
		}var vehiclePayload = [];

		// Initialize all Vehicles at that location
		for (i = 0; i < vehicleTypes.length; i++) {
			if (vehicleTypes[i]) vehiclePayload.push(vehicles[Vehicle.vehicleNames[i]]);else vehiclePayload.push(null);
		}

		// Create a new Location object and add it to the list
		var loc = new Location(payload[0], payload[1], payload[2], payload[3], payload[4], vehicleTypes, vehiclePayload);
		locations.push(loc);
		g.addVertex(loc);
		return loc;
	});
};

var loadPassengers = function loadPassengers() {
	var passengersTxt = fs.readFileSync(path.join(__dirname, '../src/settings/People.txt'), 'utf8');
	var lines = passengersTxt.split('\n').slice(1); // name,currentLocation,destination,preference,vehiclePreference
	return lines.map(function (line) {
		var payload = line.split(",");
		var passenger = new Passenger(payload[0].trim(), g.graph[payload[1]], g.graph[payload[2]], parseInt(payload[3]), payload[4].trim());
		passengers.push(passenger);
		return passenger;
	});
};

var loadPaths = function loadPaths() {
	var pathsTxt = fs.readFileSync(path.join(__dirname, '../src/settings/Paths.txt'), 'utf8');
	var lines = pathsTxt.trim().split(/\s*[\r\n]+\s*/g).slice(1); // startPoint,destPoint
	return lines.map(function (line) {
		var payload = line.split(",");
		var from = g.graph[payload[0]];
		var to = g.graph[payload[1]];
		for (var i = 0; i < 6; i++) {
			if (from.vehicleTypes[i] && to.vehicleTypes[i]) g.addEdge(from, to, getDistance(from, to), from.vehicles[i]);
		}
		return [from, to];
	});
};

// Here is the starting point for your application code.

// Small helpers you might want to keep
// All stuff below is just to show you how it works. You can delete all of it.

//const p5 = require('../app/libraries/p5.min');
// var newNode = document.createElement("div");
// document.body.appendChild(newNode);
var root = document.querySelector('#root');

var sketch = function sketch(p) {
    var gray = 0;
    var bg = void 0;

    p.setup = function () {
        var canvas = p.createCanvas(1700, 900);
        bg = p.loadImage("../Main/Map.png");
        console.log(loadVehicles());
        console.log(loadLocations());
        console.log(loadPaths());
        console.log(loadPassengers());
        g.computePaths(passengers[0]);
        console.log(getShortestPathTo(passengers[0].dest));
        canvas.parent('root');
    };

    p.draw = function () {
        p.image(bg, 0, 0);

        // Map all locations
        locations.forEach(function (loc) {
            p.fill(255, 0, 0);
            p.ellipse(loc.x, loc.y, 20, 20);

            // San Ramon and Dublin are not on the Google Maps image
            if (loc.name == "San Ramon" || loc.name == "Dublin") {
                p.fill(0);
                p.textSize(13);
                p.text(loc.name, loc.x - 30, loc.y - 20);
            }

            // For each adjacent location, draw a line between them
            loc.vehicles.forEach(function (vehicle) {
                if (vehicle != null) {
                    loc.adjacent[vehicle.name].forEach(function (e) {
                        p.line(loc.x, loc.y, e.to.x, e.to.y);
                    });
                }
            });
        });
        //p.background(gray)
        //p.rect(p.width/2 - 25, p.height/2 - 25, 50, 50)
        //p.text(g.graph, 10, 30);
    };

    p.mousePressed = function (e) {
        console.log('(' + e.x + ', ' + e.y + ')');
    };
};

// See https://github.com/processing/p5.js/wiki/Instantiation-Cases
new p5(sketch, window.document.getElementById('root')); // 2nd param can be a canvas html element

}());
//# sourceMappingURL=app.js.map