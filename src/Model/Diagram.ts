import { ModelBase } from '@chalkysticks/sdk-core';

/**
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │ ModelDiagram                                                               │
 * │                                                                            │
 * │ @namespace Model                                                           │
 * │ @package   SDK-Pad                                                         │
 * │ @project   ChalkySticks                                                    │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 */
export default class ModelDiagram extends ModelBase {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v3/diagram
     *
     * @type string
     */
    public endpoint: string = 'diagrams';

    /**
     * List of fields available
     *
     * @type string[]
     */
    public fields: string[] = [
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


    // region: Getters
    // ---------------------------------------------------------------------------

    /**
     * @return number
     */
     public getBallCount(): number {
        return parseFloat(this.attr('ball_count') as string);
    }

    /**
     * @return string
     */
    public getBallType(): string {
        return this.attr('ball_type') as string;
    }

    /**
     * @return string
     */
    public getCreatedAt(): string {
        return this.attr('created_at') as string;
    }

    /**
     * @return string
     */
    public getDiagram(): string {
        return this.attr('diagram') as string;
    }

    /**
     * @return string
     */
     public getHash(): string {
        return this.attr('hash') as string;
    }

    /**
     * @return object
     */
    public getLayout(): any {
        return JSON.parse(this.attr('layout') as string);
    }

    /**
     * @return number
     */
    public getTableType(): string {
        return this.attr('table_type') as string;
    }

    /**
     * @return number
     */
    public getVersion(): number {
        return parseFloat(this.attr('version') as string);
    }

    // endregion: Getters

}
