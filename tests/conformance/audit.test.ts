import {describe, it} from 'vitest';
import {runAuditContract} from '@holokai/holo-test';
import generateStreaming from '../fixtures/generate.streaming.fixture.js';
import generateNonStreaming from '../fixtures/generate.nonstreaming.fixture.js';
import toolcallNonStreaming from '../fixtures/generate-toolcall.nonstreaming.fixture.js';

const fixtures = [generateStreaming, generateNonStreaming, toolcallNonStreaming];

describe('gemini audit conformance', () => {
    for (const fixture of fixtures) {
        it(fixture.name, () => runAuditContract('gemini', fixture));
    }
});
