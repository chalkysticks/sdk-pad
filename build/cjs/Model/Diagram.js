"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_core_1 = require("@chalkysticks/sdk-core");
class ModelDiagram extends sdk_core_1.ModelBase {
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
    toPng() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    toPngBase64() {
        return __awaiter(this, void 0, void 0, function* () {
            const png = yield this.toPng();
            const blob = new Blob([png]);
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    resolve(reader.result);
                };
            });
        });
    }
    toSvg() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.default = ModelDiagram;
//# sourceMappingURL=Diagram.js.map