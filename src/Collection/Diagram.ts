import { Collection } from '@chalkysticks/sdk-core';
import * as Model from '../Model';

/**
 * @class Collection
 * @package Collection
 * @project ChalkySticks SDK Pad
 */
export class Diagram extends Collection.Base<Model.Diagram> {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v1/diagrams
     *
     * @type string
     */
    public endpoint: string = 'diagrams';

    /**
     * Model object instantiated by this collection
     *
     * @type Model.Diagram
     */
    public model: Model.Diagram = new Model.Diagram();
}
