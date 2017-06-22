/**
 * Created by ashwin on 2/25/17.
 */

export default class Edge {
    constructor(from, to, weight, vehicleType) {
        this.from = from;
        this.to = to;
        this.weight = weight;
        this.vehicleType = vehicleType;
    }
}

// function Edge (from, to, weight, vehicleType) {

//     this.from = from;
//     this.to = to;
//     this.weight = weight;
//     this.vehicleType = vehicleType;
// }

// module.exports = {
//     createPaths: () => {
//         const Location = require('./location');
//         //const Graph = require('./graph');
//         const pathsTxt = fs.readFileSync(path.resolve(__dirname, '../settings/Paths.txt'), 'utf8');
//         const lines = pathsTxt.trim().split(/\s*[\r\n]+\s*/g).slice(1);    // startPoint,destPoint
//         return lines.map((line) => {
//             var payload = line.split(",");

//             var from = Graph.graph[payload[0]];
//             var to = Graph.graph[payload[1]];
//             for (var i = 0; i < 6; i++) {
//                 if (from.vehicleTypes[i] && to.vehicleTypes[i])
//                     Graph.addEdge(from, to, Location.getDistance(from,to), from.vehicles[i]);
//             }

//         })
//     },
//     createEdge: (from, to, weight, vehicleType) => {
//         return new Edge(from, to, weight, vehicleType);
//     }
// };
