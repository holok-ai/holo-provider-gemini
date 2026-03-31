import {describe, it} from 'vitest';
import {runWireContract} from '@holokai/holo-test';
import generateStreaming from '../fixtures/generate.streaming.fixture.js';
import generateNonStreaming from '../fixtures/generate.nonstreaming.fixture.js';
import toolcallNonStreaming from '../fixtures/generate-toolcall.nonstreaming.fixture.js';

const fixtures = [generateStreaming, generateNonStreaming, toolcallNonStreaming];

describe('gemini wire conformance', () => {
    for (const fixture of fixtures) {
        it(fixture.name, () => runWireContract('gemini', fixture));
    }
});
