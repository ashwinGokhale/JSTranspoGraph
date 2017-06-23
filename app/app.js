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

var Vehicle = function () {
  function Vehicle(name, speedOfTravel, waitTime, unitCost, typeOfCost) {
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
  }

  createClass(Vehicle, [{
    key: "calculateCostOfTravel",
    value: function calculateCostOfTravel(distance) {
      // typeOfCost: 1 is fixed (regardless of time or distance), 2 is fixed + a factor of distance  (e.g. a Taxi cab),
      // and 3 is based on fraction of distance (e.g. a Car where unitCost is expressed as cost/gallon)

      switch (this.typeOfCost) {
        case 1:
          return this.unitCost; // Fixed Cost

        case 2:
          return this.unitCost + distance * 2; // Fixed Cost + $2 per mile

        case 3:
          return this.unitCost / 25 * distance; // Cost per gallon per mile. $3 a gallon and 25 mpg

        default:
          return 0.0;
      }
    }
  }]);
  return Vehicle;
}();

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

			var source = p.currentLoc;

			// Must reset every location distance and previous values upon each function call
			Object.values(this.graph).forEach(function (x) {
				x.dist = Infinity;
				x.prev = null;
			});

			source.dist = 0;
			var vertexQueue = new TinyQueue([], function (a, b) {
				return a && b ? a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0 : 0;
			});
			vertexQueue.push(source);

			var _loop = function _loop() {

				// Pop the Location with the least distance
				var u = vertexQueue.pop();

				// Visit each edge exiting u with the specified vehicle preference
				var pref = p.vehiclePreference;
				var adj = u.adjacent;
				adj.get(vehicles.get(p.vehiclePreference)).forEach(function (e) {
					var v = e.to; // Location v
					var alt = u.dist + e.weight; // Calculate alternative cost (double)
					if (alt < v.dist) {
						// Remove v from priority queue
						vertexQueue.data.filter(function (loc) {
							return loc == v;
						});

						v.dist = alt;
						v.prev = u;
						vertexQueue.push(v);
					}
				});
			};

			while (vertexQueue.peek()) {
				_loop();
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
        // var e = new Edge(this, neighbor, weight, vehicle);
        // if (this.adjacent[vehicle.name] != undefined && !this.adjacent[vehicle.name].includes(e)) {
        //     this.adjacent[vehicle.name].push(e);
        // }

        var e = new Edge(_this, neighbor, weight, vehicle);
        if (!_this.adjacent.get(vehicle).includes(e)) _this.adjacent.get(vehicle).push(e);
    };

    this.name = name;
    this.x = x;
    this.y = y;
    this.vehicleTypes = vehicleTypes;
    this.vehicles = vehicles;
    this.lat = latitude;
    this.lon = longitude;
    this.dist = Infinity;

    // Initialize Adjacency HashMap and map each vehicle to an ArrayList of Edges
    this.adjacent = new Map();
    vehicles.forEach(function (vehicle) {
        if (vehicle) {
            _this.adjacent.set(vehicle, []);
        }
    });
};

var getDistance = function getDistance(loc1, loc2) {
    return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2));
};

var getHaversineDistance = function getHaversineDistance(l1, l2) {
    var lat1 = l1.lat;
    var lon1 = l1.lon;
    var lat2 = l2.lat;
    var lon2 = l2.lon;

    var R = 6371; // meters

    var φ1 = Math.PI / 180 * lat1;
    var φ2 = Math.PI / 180 * lat2;
    var Δφ = Math.PI / 180 * (lat2 - lat1);
    var Δλ = Math.PI / 180 * (lon2 - lon1);

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;

    return d * 0.621371;
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

var Passenger = function () {
    function Passenger(name, currentLoc, dest, preference, vehiclePreference) {
        classCallCheck(this, Passenger);

        this.name = name;
        this.currentLoc = currentLoc;
        this.dest = dest;
        this.preference = preference; // 1 for shortest time, 2 for lowest cost
        this.vehiclePreference = vehiclePreference;
        this.path = [];
        this.cost = 0;
    }

    createClass(Passenger, [{
        key: 'setPath',
        value: function setPath(path$$1) {
            this.path = path$$1;
        }
    }, {
        key: 'calculateCost',
        value: function calculateCost() {
            // typeOfCost: 1 is fixed (regardless of time or distance), 2 is fixed + a factor of distance  (e.g. a Taxi cab),
            // and 3 is based on fraction of distance (e.g. a Car where unitCost is expressed as cost/gallon)

            var distance = 0;
            for (var i = 0; i < this.path.length - 1; i++) {
                distance += getHaversineDistance(this.path[i], this.path[i + 1]);
            }this.cost = vehicles.get(this.vehiclePreference).calculateCostOfTravel(distance);

            return this.cost;
        }
    }]);
    return Passenger;
}();

// import Edge from '../lib/edge';
var g = new Graph();
var locations = [];
var passengers = [];
var vehicles = new Map();

var loadVehicles = function loadVehicles() {
	// Initialize all Vehicles and add to the Vehicle HashMap
	for (var i = 0; i < 6; i++) {
		switch (i) {
			// Aircraft, Bart, Bicycle, Bus, Car, Taxi
			case 0:
				vehicles.set("Aircraft", new Vehicle('Aircraft', 575, 120, 400, 1));
				break;
			case 1:
				vehicles.set("Bart", new Vehicle("Bart", 60, 10, 8, 1));
				break;
			case 2:
				vehicles.set("Bicycle", new Vehicle("Bicycle", 10, 0, 0, 1));
				break;
			case 3:
				vehicles.set("Bus", new Vehicle("Bus", 30, 10, 0.5, 1));
				break;
			case 4:
				vehicles.set("Car", new Vehicle("Car", 50, 0, 3, 3));
				break;
			case 5:
				vehicles.set("Taxi", new Vehicle("Taxi", 50, 10, 1.5, 2));
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
			vehicleTypes[i] = types[i] == 1;
		}var vehiclePayload = [];

		// Initialize all Vehicles at that location
		for (i = 0; i < vehicleTypes.length; i++) {
			if (vehicleTypes[i]) vehiclePayload.push(vehicles.get(Vehicle.vehicleNames[i]));else vehiclePayload.push(null);
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

var root = document.querySelector('#root');

var sketch = function sketch(p) {
    var bg = void 0,
        x = void 0,
        y = void 0;
    var path$$1 = [];
    var passengerIndex = 0;
    var locIndex = 1;
    var h = 20;
    var labels = [];

    p.setup = function () {
        var canvas = p.createCanvas(1700, 900);
        canvas.parent('root');
        bg = p.loadImage('../build/icons/Map.PNG');
        loadVehicles();
        loadLocations();
        loadPaths();
        loadPassengers();

        passengers.forEach(function (passenger) {
            g.computePaths(passenger);
            var personPath = getShortestPathTo(passenger.dest);
            if (personPath[0] == personPath[1]) passenger.setPath([passenger.currentLoc, passenger.currentLoc]);else passenger.setPath(personPath);

            console.log(passenger.name + '\'s path using ' + passenger.vehiclePreference + ':');
            var pathString = passenger.path.map(function (loc) {
                return loc.name;
            }).join(', ');
            console.log('' + pathString);
        });

        p.background(255);

        path$$1 = passengers[passengerIndex].path;
        x = path$$1[0].x;
        y = path$$1[0].y;
    };

    p.draw = function () {
        p.image(bg, 0, 0);
        p.frameRate(30);

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
                    loc.adjacent.get(vehicle).forEach(function (e) {
                        p.line(loc.x, loc.y, e.to.x, e.to.y);
                    });
                }
            });
        });

        x = p.lerp(parseFloat(x), parseFloat(path$$1[locIndex].x), 0.1);
        y = p.lerp(parseFloat(y), parseFloat(path$$1[locIndex].y), 0.1);

        // Create a circle that represents the current passenger as they traverse the graph and add their name above it
        p.fill(0, 175, 255);
        p.ellipse(x, y, 25, 25);
        p.fill(0);
        p.text(passengers[passengerIndex].name, x - 10, y);

        // Once a passenger arrives at their next location, if they arrive at their destination, go to the next person, otherwise, go to next location
        if (Math.abs(x - parseFloat(path$$1[locIndex].x)) < 1 || Math.abs(y - parseFloat(path$$1[locIndex].y)) < 1) {
            var changedPaths = false;

            // If passenger has reached their destination
            if (locIndex + 1 == path$$1.length) {
                // If last passenger has reached their destination
                if (passengerIndex + 1 == passengers.length) {
                    console.log("FINISHED!");
                    // Print the last person's name at their finishing position
                    p.fill(60, 0, 110);
                    p.textSize(20);
                    p.text(passengers[passengerIndex].name, x - 10, y - 20);

                    // Print all passenger's paths in the white space to the right
                    passengers.forEach(function (passenger) {
                        // If passenger could not find a path to their destination, their path would be: [currentLoc, currentLoc]
                        if (passenger.path[0] == passenger.path[1]) p.text('No possible path for ' + passenger.name + ' to go from ' + passenger.currentLoc.name + ' to ' + passenger.dest.name + ' using a %s\n', 720, h);else p.text(passenger.name + '\'s path: ' + passenger.path.map(function (loc) {
                            return loc.name;
                        }).join(', ') + ' Using: ' + passenger.vehiclePreference + '   Total Cost: ' + passenger.calculateCost().toLocaleString('en-US', { style: "currency", currency: "USD" }) + '\n', 720, h);

                        h += 20;
                    });

                    // Stop drawing
                    p.noLoop();
                }

                // If passenger has reached their destination, get next passenger
                else {
                        labels.push({
                            "name": passengers[passengerIndex].name,
                            "x": x - 10,
                            "y": y - 20
                        });
                        passengerIndex++;
                        locIndex = 1;
                        changedPaths = true;
                    }
            }

            // Otherwise, continue to the next location
            else {
                    locIndex++;
                }

            path$$1 = passengers[passengerIndex].path;

            // If passenger has changed, set x and y to the coordinates of their current location
            if (changedPaths) {
                x = path$$1[0].x;
                y = path$$1[0].y;
            }
        }

        labels.forEach(function (label) {
            p.fill(60, 0, 110);
            p.textSize(20);
            p.text(label.name, label.x, label.y);
        });
    };

    p.mousePressed = function (e) {
        console.log('(' + e.x + ', ' + e.y + ')');
    };
};

new p5(sketch);

}());
//# sourceMappingURL=app.js.map