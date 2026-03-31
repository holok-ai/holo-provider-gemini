import {PluginManifest, PluginType} from "@holokai/holo-types/plugin";
import {VERSION} from './version';

export const manifest: PluginManifest = {
    name: '@holokai/provider-gemini',
    version: VERSION,
    pluginType: PluginType.PROVIDER,
    family: 'gemini',
    displayName: 'Gemini Provider',
    description: 'Google Gemini provider plugin for Holo.',
};
