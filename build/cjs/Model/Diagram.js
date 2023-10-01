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
exports.Diagram = void 0;
const sdk_core_1 = require("@chalkysticks/sdk-core");
class Diagram extends sdk_core_1.Model.Base {
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
exports.Diagram = Diagram;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9EaWFncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFEQUErQztBQVUvQyxNQUFhLE9BQVEsU0FBUSxnQkFBSyxDQUFDLElBQUk7SUFBdkM7O1FBT1csYUFBUSxHQUFXLFVBQVUsQ0FBQztRQU85QixXQUFNLEdBQWE7WUFDdEIsSUFBSTtZQUNKLE1BQU07WUFDTixTQUFTO1lBQ1QsUUFBUTtZQUNSLFlBQVk7WUFDWixXQUFXO1lBQ1gsWUFBWTtZQUNaLGFBQWE7WUFDYixTQUFTO1lBQ1QsWUFBWTtZQUNaLFlBQVk7U0FDZixDQUFDO1FBS0ssYUFBUSxHQUFXLHFDQUFxQyxDQUFDO0lBNEpwRSxDQUFDO0lBcEpPLFlBQVk7UUFDWixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUtNLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFXLENBQUM7SUFDNUMsQ0FBQztJQUtNLFlBQVk7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFXLENBQUM7SUFDN0MsQ0FBQztJQU1NLFVBQVU7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDMUMsQ0FBQztJQUtHLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQUtNLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQVcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFLTSxZQUFZO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzdDLENBQUM7SUFNRyxNQUFNLENB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