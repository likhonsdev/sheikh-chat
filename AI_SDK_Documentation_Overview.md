# AI SDK Documentation Overview

This document provides an overview of the AI SDK documentation provided.

## Core Concepts and SDKs

*   **AI SDK Overview**: Introduction to the AI SDK, its purpose (standardizing AI model integration), and main libraries (AI SDK Core, AI SDK UI).
*   **AI SDK 5 Alpha**: Details about the alpha version of AI SDK 5, including its motivation (handling complex LLM outputs and new use-cases like agents) and new features:
    *   **LanguageModelV2**: Redesigned architecture for LLM communication, treating all outputs as content parts.
    *   **Message Overhaul**: Introduction of `UIMessage` (for UI rendering) and `ModelMessage` (for model communication), with features like type-safe metadata and data parts.
    *   **ChatStore**: New `useChat` architecture for flexible state management and API integration.
    *   **Server-Sent Events (SSE)**: Standardized protocol for sending UI messages.
    *   **Agentic Control**: Primitives like `prepareStep` and `stopWhen` for building agentic systems.

## AI SDK Core

The AI SDK Core provides a unified API for interacting with Large Language Models (LLMs).

*   **Overview**: Introduction to AI SDK Core functions for text generation, structured data, and tool usage.
*   **Generating Text**: How to generate and stream text using `generateText` and `streamText`, including callbacks (`onError`, `onChunk`, `onFinish`), accessing response headers/body, handling sources, long text generation, and stream transformation (e.g., `smoothStream`).
*   **Generating Structured Data**: How to generate and stream structured objects using `generateObject` and `streamObject` with Zod/JSON/Valibot schemas. Covers output strategies (object, array, enum, no-schema), generation modes (auto, tool, json), schema naming, error handling (`AI_NoObjectGeneratedError`), and experimental JSON repair.
*   **Tool Calling**: Defining and using tools with LLMs (`generateText`, `streamText`), including multi-step calls (`maxSteps`), accessing intermediate steps, `onStepFinish` callback, `experimental_prepareStep`, response messages, tool choice, tool execution options (toolCallId, messages, abortSignals), typing, error handling, experimental tool call repair, active tools, multi-modal tool results, and MCP tools.
*   **Prompt Engineering**: Tips for developing effective prompts, especially for tools and structured data schemas (e.g., handling Zod dates). Includes debugging by inspecting warnings and HTTP request bodies.
*   **Settings**: Common settings for AI SDK functions (`maxTokens`, `temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `seed`, `maxRetries`, `abortSignal`, `headers`).
*   **Embeddings**: Generating embeddings for single or multiple values using `embed` and `embedMany`, calculating similarity with `cosineSimilarity`, and understanding token usage and settings.
*   **Image Generation**: Generating images using `experimental_generateImage`, including settings for size/aspect ratio, multiple images, seed, provider-specific options, and error handling (`AI_NoImageGeneratedError`). Also covers image generation via language models.
*   **Transcription**: Transcribing audio using `experimental_transcribe`, including settings and error handling (`AI_NoTranscriptGeneratedError`).
*   **Speech**: Generating speech from text using `experimental_generateSpeech`, including settings and error handling (`AI_NoAudioGeneratedError`).
*   **Language Model Middleware**: Enhancing language model behavior with middleware (e.g., `extractReasoningMiddleware`, `simulateStreamingMiddleware`, `defaultSettingsMiddleware`) for features like guardrails, RAG, caching, and logging.
*   **Provider & Model Management**: Managing multiple providers and models using custom providers (`customProvider`) and a provider registry (`createProviderRegistry`) for centralized configuration and aliasing.
*   **Error Handling**: General strategies for handling regular and streaming errors.
*   **Testing**: Using mock providers (`MockLanguageModelV1`, `MockEmbeddingModelV1`) and test helpers (`mockId`, `mockValues`, `simulateReadableStream`) for unit testing.
*   **Telemetry**: Using OpenTelemetry for collecting telemetry data (experimental), including configuration and details on collected data for various functions.

## AI SDK UI

The AI SDK UI is a framework-agnostic toolkit for building interactive AI applications, supporting React, Svelte, Vue.js, and SolidJS (deprecated).

*   **Overview**: Introduction to AI SDK UI hooks (`useChat`, `useCompletion`, `useObject`, `useAssistant`).
*   **Chatbot (`useChat`)**: Creating conversational UIs with message streaming, state management (status, error), UI customization (modifying messages, controlled input, cancellation/regeneration), event callbacks (`onFinish`, `onError`, `onResponse`), request configuration (custom API, headers, body), and handling of reasoning, sources, and image generation parts.
*   **Chatbot Message Persistence**: Storing and loading chat messages, managing message IDs, sending only the last message, handling client disconnects, and experimental resumable streams.
