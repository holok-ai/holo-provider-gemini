# @holokai/holo-provider-gemini

> **Google Gemini provider plugin for Holo LLM Gateway**

---

## Overview

The Gemini provider plugin enables Holo to communicate with Google's Gemini API. It provides bidirectional translation
between Gemini's native API and the portable Holo format using the `@google/genai` SDK.

### Key Features

- Full Holo SDK integration with strict type safety
- Bidirectional translation: Gemini native format <-> Holo universal format
- Streaming support via `streamGenerateContent`
- Tool calling / function calling
- Vision and multimodal input
- Embedding support via `embedContent`
- Built-in pricing dataset with cost calculation
- Thinking token and cache read cost tracking

---

## Installation

```bash
npm install @holokai/holo-provider-gemini
```

### Peer Dependencies

- `@holokai/holo-sdk` ^1.2.2

---

## Quick Start

### Automatic Discovery

When installed in a Holo worker environment, this plugin is automatically discovered and loaded. No manual registration
required.

### Configuration

Add a provider configuration to your Holo deployment:

```json
{
  "provider_type": "gemini",
  "plugin_id": "@holokai/holo-provider-gemini",
  "api_key": "${GEMINI_API_KEY}",
  "model": "gemini-2.0-flash",
  "config": {
    "defaultModel": "gemini-2.0-flash"
  }
}
```

---

## Protocols

| Protocol                       | Capability       | Route                                         | Method |
|--------------------------------|------------------|-----------------------------------------------|--------|
| `gemini.generateContent`       | Chat             | `/v1beta/models/:model:generateContent`       | POST   |
| `gemini.streamGenerateContent` | Chat (streaming) | `/v1beta/models/:model:streamGenerateContent` | POST   |
| `gemini.embedContent`          | Embed            | `/v1beta/models/:model:embedContent`          | POST   |
| `gemini.models`                | Models           | `/v1beta/models`                              | GET    |

The default protocol is `gemini.generateContent`.

---

## Capabilities

```typescript
{
    streaming: true,
    tools: true,
    vision: true,
    functionCalling: true,
    maxTokens: 1_000_000
}
```

---

## Architecture

```
plugins/holo-provider-gemini/
├── src/
│   ├── index.ts                   Default export of plugin instance
│   ├── manifest.ts                Plugin manifest (family: 'gemini')
│   ├── plugin.ts                  GeminiProviderPlugin — routes, capabilities, pricing
│   ├── gemini.provider.ts         GeminiProvider — request execution via @google/genai
│   ├── gemini.auditor.ts          Audit record construction
│   ├── gemini.translator.ts       Holo <-> Gemini format translation
│   ├── gemini.wire.adapter.ts     Event-to-wire serialization (SSE/JSON)
│   ├── gemini.response.factory.ts Response envelope construction
│   └── gemini.pricing.ts          Built-in pricing dataset
├── tests/
│   └── fixtures/                  Conformance test fixtures
├── package.json
└── tsconfig.json
```

---

## Holo Format Mapping

### Request Translation (Holo -> Gemini)

| Holo Field                     | Gemini Field                       |
|--------------------------------|------------------------------------|
| `messages[].role: 'user'`      | `contents[].role: 'user'`          |
| `messages[].role: 'assistant'` | `contents[].role: 'model'`         |
| `messages[].content` (text)    | `contents[].parts[].text`          |
| `messages[].content` (image)   | `contents[].parts[].inlineData`    |
| `system`                       | `systemInstruction`                |
| `max_tokens`                   | `generationConfig.maxOutputTokens` |
| `temperature`                  | `generationConfig.temperature`     |
| `top_p`                        | `generationConfig.topP`            |
| `top_k`                        | `generationConfig.topK`            |
| `stop_sequences`               | `generationConfig.stopSequences`   |
| `tools`                        | `tools[].functionDeclarations`     |

### Response Translation (Gemini -> Holo)

| Gemini Field                         | Holo Field                   |
|--------------------------------------|------------------------------|
| `candidates[0].content.parts[].text` | `choices[0].message.content` |
| `candidates[0].finishReason`         | `choices[0].finish_reason`   |
| `usageMetadata.promptTokenCount`     | `usage.prompt_tokens`        |
| `usageMetadata.candidatesTokenCount` | `usage.completion_tokens`    |
| `usageMetadata.totalTokenCount`      | `usage.total_tokens`         |

---

## Testing

Tests use the `@holokai/holo-test` conformance framework with fixture-driven testing:

```bash
npm test
```

---

## License

MIT
