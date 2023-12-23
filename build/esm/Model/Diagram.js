import { Model } from '@chalkysticks/sdk-core';
export class Diagram extends Model.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'diagrams';
        this.fields = ['id', 'hash', 'diagram', 'layout', 'table_type', 'ball_type', 'ball_count', 'is_complete', 'version', 'created_at', 'updated_at'];
        this.imageUrl = 'https://pad.chalkysticks.com/image/';
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
    getUrl(type = 'svg') {
        let output = this.imageUrl + this.getHash();
        if (type !== 'svg') {
            output += `.${type}`;
        }
        if (this.isV2()) {
            output = output.replace('/image', '');
        }
        return output;
    }
    getVersion() {
        return parseFloat(this.attr('version'));
    }
    async toPng() {
        return new Promise((resolve) => {
            const req = new XMLHttpRequest();
            const url = this.getUrl('png');
            req.open('GET', url, true);
            req.responseType = 'arraybuffer';
            req.onload = (event) => {
                const arrayBuffer = req.response;
                if (arrayBuffer) {
                    const byteArray = new Uint8Array(arrayBuffer);
                    resolve(byteArray);
                }
            };
            req.send(null);
        });
    }
    async toPngBase64() {
        const png = await this.toPng();
        const blob = new Blob([png]);
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                resolve(reader.result);
            };
        });
    }
    async toSvg() {
        return new Promise((resolve) => {
            if (this.isV1()) {
                const req = new XMLHttpRequest();
                const url = this.getUrl('svg');
                req.open('GET', url, true);
                req.onload = (event) => resolve(req.responseText);
                req.send(null);
            }
            else if (this.isV2() || this.isV3()) {
                resolve(this.getDiagram());
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9EaWFncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVUvQyxNQUFNLE9BQU8sT0FBUSxTQUFRLEtBQUssQ0FBQyxJQUFJO0lBQXZDOztRQU9RLGFBQVEsR0FBVyxVQUFVLENBQUM7UUFPOUIsV0FBTSxHQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBUW5KLGFBQVEsR0FBVyxxQ0FBcUMsQ0FBQztJQTRKcEUsQ0FBQztJQXBKTyxZQUFZO1FBQ2xCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBS00sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFXLENBQUM7SUFDekMsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzFDLENBQUM7SUFNTSxVQUFVO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQVcsQ0FBQztJQUN2QyxDQUFDO0lBS00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQztJQUNwQyxDQUFDO0lBS00sU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxD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