"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_core_1 = require("@chalkysticks/sdk-core");
const Diagram_1 = require("../Model/Diagram");
class CollectionDiagram extends sdk_core_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.endpoint = 'diagrams';
        this.model = new Diagram_1.default();
    }
}
exports.default = CollectionDiagram;
//# sourceMappingURL=Diagram.js.map