import type {FixtureScenario} from '@holokai/holo-test';
import {ProviderResponseStatus} from '@holokai/holo-types/entities';

const generateResponse = {
    candidates: [
        {
            content: {
                parts: [
                    {
                        functionCall: {
                            name: 'calculate',
                            args: {expression: '2 + 2'},
                        },
                    }
                ],
                role: 'model',
            },
            finishReason: 'STOP',
            index: 0,
        }
    ],
    usageMetadata: {
        promptTokenCount: 50,
        candidatesTokenCount: 20,
        totalTokenCount: 70,
    },
    modelVersion: 'gemini-2.5-flash',
};

const fixture: FixtureScenario = {
    name: 'gemini/generate-toolcall.nonstreaming',
    plugin: 'gemini',
    protocol: 'gemini.generateContent',
    streaming: false,

    providerChunks: [generateResponse],
    expectedText: '',

    expectedWire: [
        JSON.stringify(generateResponse),
    ],
    expectedStatus: 200,
    expectedHeaders: {'Content-Type': 'application/json'},

    expectedAudit: {
        access_model: 'gemini-2.5-flash',
        input_tokens: 50,
        output_tokens: 20,
        status: ProviderResponseStatus.SUCCESS,
    },

    tags: ['generate', 'nonstreaming', 'tool_call'],
};

export default fixture;
