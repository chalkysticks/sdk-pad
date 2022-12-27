import { ModelBase } from '@chalkysticks/sdk-core';
export default class ModelDiagram extends ModelBase {
    endpoint: string;
    fields: string[];
    protected imageUrl: string;
    getBallCount(): number;
    getBallType(): string;
    getCreatedAt(): string;
    getDiagram(): string;
    getHash(): string;
    getLayout(): any;
    getTableType(): string;
    getUrl(type?: string): string;
    getVersion(): number;
    toPng(): Promise<Uint8Array>;
    toPngBase64(): Promise<string>;
    toSvg(): Promise<string>;
}