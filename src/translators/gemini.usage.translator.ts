import 'reflect-metadata';
import {injectable} from 'tsyringe';
import {BaseTranslator} from "@holokai/holo-sdk/provider";
import {pickDefined} from "@holokai/holo-sdk";
import type {HoloUsage} from "@holokai/holo-types/holo";
import type {GenerateContentResponseUsageMetadata} from "@google/genai";

@injectable()
export class GeminiUsageTranslator extends BaseTranslator<HoloUsage, GenerateContentResponseUsageMetadata> {
    protected holoDefaults: Partial<HoloUsage> = {};
    protected providerDefaults: Partial<GenerateContentResponseUsageMetadata> = {};

    constructor() {
        super();
    }

    protected async fromHoloImpl(source: HoloUsage): Promise<Partial<GenerateContentResponseUsageMetadata>> {
        return pickDefined({
            promptTokenCount: source.input_tokens,
            candidatesTokenCount: source.output_tokens,
            totalTokenCount: source.total_tokens,
            cachedContentTokenCount: source.cache_read_tokens
        });
    }

    protected async toHoloImpl(source: GenerateContentResponseUsageMetadata): Promise<Partial<HoloUsage>> {
        return pickDefined({
            input_tokens: source.promptTokenCount,
            output_tokens: source.candidatesTokenCount,
            total_tokens: source.totalTokenCount
                ?? (source.promptTokenCount && source.candidatesTokenCount
                    ? source.promptTokenCount + source.candidatesTokenCount
                    : undefined),
            cache_read_tokens: source.cachedContentTokenCount || undefined
        }) as Partial<HoloUsage>;
    }
}
