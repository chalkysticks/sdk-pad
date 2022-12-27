import { CollectionBase } from '@chalkysticks/sdk-core';
import ModelDiagram from '../Model/Diagram';
export default class CollectionDiagram extends CollectionBase<ModelDiagram> {
    endpoint: string;
    model: ModelDiagram;
}
