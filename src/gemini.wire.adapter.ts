import {BaseWireAdapter} from "@holokai/holo-sdk/provider";

export class GeminiWireAdapter extends BaseWireAdapter {
    formatWire(data: any): string {
        return `data: ${JSON.stringify(data)}\n\n`;
    }
}
