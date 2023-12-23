import { Model } from '@chalkysticks/sdk-core';
export class Diagram extends Model.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'diagrams';
        this.fields = [
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
        return new Promise(resolve => {
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
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                resolve(reader.result);
            };
        });
    }
    async toSvg() {
        return new Promise(resolve => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9EaWFncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVUvQyxNQUFNLE9BQU8sT0FBUSxTQUFRLEtBQUssQ0FBQyxJQUFJO0lBQXZDOztRQU9XLGFBQVEsR0FBVyxVQUFVLENBQUM7UUFPOUIsV0FBTSxHQUFhO1lBQ3RCLElBQUk7WUFDSixNQUFNO1lBQ04sU0FBUztZQUNULFFBQVE7WUFDUixZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixhQUFhO1lBQ2IsU0FBUztZQUNULFlBQVk7WUFDWixZQUFZO1NBQ2YsQ0FBQztRQUtLLGFBQVEsR0FBVyxxQ0FBcUMsQ0FBQztJQTRKcEUsQ0FBQztJQXBKTyxZQUFZO1FBQ1osT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQVcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFLTSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBVyxDQUFDO0lBQzVDLENBQUM7SUFLTSxZQUFZO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzdDLENBQUM7SUFNTSxVQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBVyxDQUFDO0lBQzFDLENBQUM7SUFLRyxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFLTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFXLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBS00sWUFBWTtRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQVcsQ0FBQztJ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