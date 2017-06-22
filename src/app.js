// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.

import { loadPassengers, loadVehicles, loadLocations, loadPaths } from './settings/settings';
import { locations, g, passengers } from './settings/settings';
import { getShortestPathTo } from './lib/graph';
import p5 from 'p5';

//const p5 = require('../app/libraries/p5.min');
// var newNode = document.createElement("div");
// document.body.appendChild(newNode);
let root = document.querySelector('#root');

const sketch = (p) => {
  let gray = 0;
  let bg;

  p.setup = () => {
    let canvas = p.createCanvas(1700,900);
    bg = p.loadImage("../Main/Map.png");
    console.log(loadVehicles());
    console.log(loadLocations());
    console.log(loadPaths());
    console.log(loadPassengers());
    g.computePaths(passengers[0]);
    console.log(getShortestPathTo(passengers[0].dest));
    canvas.parent('root')
  }

  p.draw = () => {
    p.image(bg, 0, 0);

    // Map all locations
    locations.forEach((loc) => {
        p.fill(255, 0, 0);
        p.ellipse(loc.x, loc.y, 20,20);

        // San Ramon and Dublin are not on the Google Maps image
        if (loc.name == ("San Ramon") || loc.name == ("Dublin")) {
            p.fill(0);
            p.textSize(13);
            p.text(loc.name, loc.x - 30, loc.y - 20);
        }

        // For each adjacent location, draw a line between them
        loc.vehicles.forEach((vehicle) => {
            if (vehicle != null) {
                loc.adjacent[vehicle.name].forEach((e) => {
                    p.line(loc.x, loc.y, e.to.x, e.to.y);
                });
            }
        })
    });
	//p.background(gray)
	//p.rect(p.width/2 - 25, p.height/2 - 25, 50, 50)
	//p.text(g.graph, 10, 30);
  }

  p.mousePressed = (e) => {
	console.log(`(${e.x}, ${e.y})`);
  }
}

// See https://github.com/processing/p5.js/wiki/Instantiation-Cases
new p5(sketch, window.document.getElementById('root'));  // 2nd param can be a canvas html element