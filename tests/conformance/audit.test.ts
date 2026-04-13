import {describe, it} from 'vitest';
import {runAuditContract} from '@holokai/holo-test';
import generateStreaming from '../fixtures/generate.streaming.fixture';
import generateNonStreaming from '../fixtures/generate.nonstreaming.fixture';
import toolcallNonStreaming from '../fixtures/generate-toolcall.nonstreaming.fixture';

const fixtures = [generateStreaming, generateNonStreaming, toolcallNonStreaming];

describe('gemini audit conformance', () => {
    for (const fixture of fixtures) {
        it(fixture.name, () => runAuditContract('gemini', fixture));
    }
});
