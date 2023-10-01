import { Model } from '@chalkysticks/sdk-core';

/**
 * We're intentionally not building the diagrams here. We're keeping that
 * behind the server wall.
 *
 * @class Diagram
 * @package Model
 * @project ChalkySticks SDK Pad
 */
export class Diagram extends Model.Base {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v3/diagrams
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

	/**
	 * @type string
	 */
	protected imageUrl: string = 'https://pad.chalkysticks.com/image/';

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
	 * @requires v2+
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
	 * @param string type
	 * @return string
	 */
	public getUrl(type: string = 'svg'): string {
		let output: string = this.imageUrl + this.getHash();

		// Add extension for non-svg formats
		if (type !== 'svg') {
			output += `.${type}`;
		}

		// v2 doesn't use /image
		if (this.isV2()) {
			output = output.replace('/image', '');
		}

		return output;
	}

    /**
     * @return number
     */
    public getVersion(): number {
        return parseFloat(this.attr('version') as string);
    }

	/**
	 * @return Promise<byteArray>
	 */
	public async toPng(): Promise<Uint8Array> {
		return new Promise(resolve => {
			const req: XMLHttpRequest = new XMLHttpRequest();
			const url: string = this.getUrl('png');

			// Open request for image
			req.open('GET', url, true);

			// Request binary data
			req.responseType = 'arraybuffer';

			// Listen for load
			req.onload = (event) => {
				const arrayBuffer = req.response; // Note: not req.responseText

				if (arrayBuffer) {
					const byteArray = new Uint8Array(arrayBuffer);
					resolve(byteArray);
				}
			};

			// Request
			req.send(null);
		});
	}

	/**
	 * @return Promise<string>
	 */
	public async toPngBase64(): Promise<string> {
		const png: Uint8Array = await this.toPng();
		const blob: Blob = new Blob([png]);

		return new Promise(resolve => {
			const reader: FileReader = new FileReader();

			reader.readAsDataURL(blob);
			reader.onloadend = function() {
				resolve(reader.result as string);
			}
		});
	}

	/**
	 * @return Promise<string>
	 */
	public async toSvg(): Promise<string> {
		return new Promise(resolve => {
			// We send JSON in v1
			if (this.isV1()) {
				const req: XMLHttpRequest = new XMLHttpRequest();
				const url: string = this.getUrl('svg');

				// Open request for image
				req.open('GET', url, true);

				// Listen for load
				req.onload = (event) => resolve(req.responseText);

				// Request
				req.send(null);
			}

			// We send diagrams directly down in v2 and v3
			else if (this.isV2() || this.isV3()) {
				resolve(this.getDiagram());
			}
		});
	}

    // endregion: Getters
}
