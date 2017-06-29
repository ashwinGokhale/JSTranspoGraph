import { loadPassengers, loadVehicles, loadLocations, loadPaths } from './settings/settings';
import { locations, g, passengers } from './settings/settings';
import { getShortestPathTo } from './lib/graph';

export const sketch = (p) => {
  let bg, x, y;
  let path = [];
  let passengerIndex = 0;
  let locIndex = 1;
  let h = 20;
  let labels = [];

  p.setup = () => {
    let canvas = p.createCanvas(1700,900);
    canvas.parent('root')
    bg = p.loadImage('../build/icons/Map.PNG');
    loadVehicles();
    loadLocations();
    loadPaths();
    loadPassengers();


    passengers.forEach((passenger) => {
        g.computePaths(passenger);
        let personPath = getShortestPathTo(passenger.dest)
        if (personPath[0] == personPath[1])
            passenger.setPath([passenger.currentLoc, passenger.currentLoc])
        else
            passenger.setPath(personPath)

        console.log(`${passenger.name}'s path using ${passenger.vehiclePreference}:`);
        let pathString = passenger.path.map(loc => loc.name).join(', ');
        console.log(`${pathString}`);
    });

    p.background(255);

    path = passengers[passengerIndex].path;
    x = path[0].x;
    y = path[0].y;
  }

  p.draw = () => {
    p.image(bg, 0, 0);
    p.frameRate(30);

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
                loc.adjacent.get(vehicle).forEach((e) => {
                    p.line(loc.x, loc.y, e.to.x, e.to.y);
                });
            }
        });
    });

    x = p.lerp(parseFloat(x), parseFloat(path[locIndex].x), 0.1);
    y = p.lerp(parseFloat(y), parseFloat(path[locIndex].y), 0.1);

    // Create a circle that represents the current passenger as they traverse the graph and add their name above it
    p.fill(0,175,255);
    p.ellipse(x,y,25,25);
    p.fill(0);
    p.text(passengers[passengerIndex].name, x-10, y);

    // Once a passenger arrives at their next location, if they arrive at their destination, go to the next person, otherwise, go to next location
    if (Math.abs(x - parseFloat(path[locIndex].x)) < 1 || Math.abs(y - parseFloat(path[locIndex].y)) < 1){
        let changedPaths = false;

        // If passenger has reached their destination
        if ((locIndex + 1) == path.length) {
            // If last passenger has reached their destination
            if ((passengerIndex + 1) == passengers.length) {
                console.log("FINISHED!");
                // Print the last person's name at their finishing position
                p.fill(60, 0, 110);
                p.textSize(20);
                p.text(passengers[passengerIndex].name, x-10, y-20);

                // Print all passenger's paths in the white space to the right
                passengers.forEach((passenger) => {
                    // If passenger could not find a path to their destination, their path would be: [currentLoc, currentLoc]
                    if (passenger.path[0] == passenger.path[1]) 
                        p.text(`No possible path for ${passenger.name} to go from ${passenger.currentLoc.name} to ${passenger.dest.name} using a %s\n`, 720, h);
                    
                    else
                        p.text(`${passenger.name}'s path: ${passenger.path.map(loc => loc.name).join(', ')} Using: ${passenger.vehiclePreference}   Total Cost: ${passenger.calculateCost().toLocaleString('en-US', { style: "currency", currency: "USD" })}\n`, 720,h);
                    
                    h += 20;
                })


                // Stop drawing
                p.noLoop();
            }

            // If passenger has reached their destination, get next passenger
            else {
                labels.push({
                    "name": passengers[passengerIndex].name,
                    "x": x-10,
                    "y": y-20
                });
                passengerIndex++;
                locIndex = 1;
                changedPaths = true;
            }
        }

        // Otherwise, continue to the next location
        else{
            locIndex++;
        }

        path = passengers[passengerIndex].path;

        // If passenger has changed, set x and y to the coordinates of their current location
        if (changedPaths) {
            x = path[0].x;
            y = path[0].y;
        }
    }

    labels.forEach((label) => {
        p.fill(60, 0, 110);
        p.textSize(20);
        p.text(label.name, label.x, label.y);
    });
  }

  p.mousePressed = (e) => {
	console.log(`(${e.x}, ${e.y})`);
  }
}