import { CollectionBase } from '@chalkysticks/sdk-core';
import ModelDiagram from '../Model/Diagram';

/**
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │ CollectionDiagram                                                          │
 * │                                                                            │
 * │ @namespace Collection                                                      │
 * │ @package   SDK-Pad                                                         │
 * │ @project   ChalkySticks                                                    │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 */
export default class CollectionDiagram extends CollectionBase {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v1/diagram
     *
     * @type string
     */
    public endpoint: string = 'diagrams';

    /**
     * Model object instantiated by this collection
     *
     * @type ModelDiagram
     */
    public model: any = ModelDiagram;
}
