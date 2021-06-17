import { ModelBase } from '@chalkysticks/sdk-core';
export default class ModelDiagram extends ModelBase {
    endpoint: string;
    fields: string[];
    getBallCount(): number;
    getBallType(): string;
    getCreatedAt(): string;
    getDiagram(): string;
    getHash(): string;
    getLayout(): any;
    getTableType(): string;
    getVersion(): number;
}
