import {describe, it} from 'vitest';
import {runPipelineContract} from '@holokai/holo-test';
import generateStreaming from '../fixtures/generate.streaming.fixture';
import generateNonStreaming from '../fixtures/generate.nonstreaming.fixture';
import toolcallNonStreaming from '../fixtures/generate-toolcall.nonstreaming.fixture';

const fixtures = [generateStreaming, generateNonStreaming, toolcallNonStreaming];

describe('gemini pipeline conformance', () => {
    for (const fixture of fixtures) {
        it(fixture.name, () => runPipelineContract('gemini', fixture));
    }
});
