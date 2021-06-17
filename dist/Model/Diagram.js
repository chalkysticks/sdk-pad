"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_core_1 = require("@chalkysticks/sdk-core");
class ModelDiagram extends sdk_core_1.ModelBase {
    constructor() {
        super(...arguments);
        this.endpoint = 'diagrams';
        this.fields = [
            'id',
            'hash',
            'diagram',
            'layout',
            'table_type',
            'ball_type',
            'ball_count',
            'is_complete',
            'version',
            'created_at',
            'updated_at',
        ];
    }
    getBallCount() {
        return parseFloat(this.attr('ball_count'));
    }
    getBallType() {
        return this.attr('ball_type');
    }
    getCreatedAt() {
        return this.attr('created_at');
    }
    getDiagram() {
        return this.attr('diagram');
    }
    getHash() {
        return this.attr('hash');
    }
    getLayout() {
        return JSON.parse(this.attr('layout'));
    }
    getTableType() {
        return this.attr('table_type');
    }
    getVersion() {
        return parseFloat(this.attr('version'));
    }
}
exports.default = ModelDiagram;
//# sourceMappingURL=Diagram.js.map