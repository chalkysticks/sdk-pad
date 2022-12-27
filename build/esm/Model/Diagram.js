import { ModelBase } from '@chalkysticks/sdk-core';
export default class ModelDiagram extends ModelBase {
    endpoint = 'diagrams';
    fields = [
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
    imageUrl = 'https://pad.chalkysticks.com/image/';
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
//# sourceMappingURL=Diagram.js.map