import { CollectionBase } from '@chalkysticks/sdk-core';
import ModelDiagram from '../Model/Diagram';

/**
 * @class CollectionDiagram
 * @package Collection
 * @project ChalkySticks SDK Pad
 */
export default class CollectionDiagram extends CollectionBase<ModelDiagram> {
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
     * @type ModelDiagram
     */
    public model: ModelDiagram = new ModelDiagram();
}
