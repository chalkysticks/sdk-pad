import { Collection } from '@chalkysticks/sdk-core';
import * as Model from '../Model';
export class Diagram extends Collection.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'diagrams';
        this.model = new Model.Diagram();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0RpYWdyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBT2xDLE1BQU0sT0FBTyxPQUFRLFNBQVEsVUFBVSxDQUFDLElBQW1CO0lBQTNEOztRQU9XLGFBQVEsR0FBVyxVQUFVLENBQUM7UUFPOUIsVUFBSyxHQUFrQixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0NBQUEifQ==