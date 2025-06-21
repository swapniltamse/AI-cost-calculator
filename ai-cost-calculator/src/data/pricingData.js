// ai-cost-calculator/src/data/pricingData.js

// IMPORTANT: ALL PRICING DATA HERE IS HARDCODED AND MUST BE MANUALLY UPDATED
// FROM OFFICIAL PROVIDER DOCUMENTATION AS PRICES CAN CHANGE FREQUENTLY.

export const PRICING_DATA = {
  openai: {
    name: "OpenAI",
    models: {
      "gpt-4o": {
        displayName: "GPT-4o",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 5.0, // $5.00 / 1M tokens
          output_per_million_tokens: 15.0, // $15.00 / 1M tokens
        },
        contextWindow: "128k",
      },
      "gpt-4-turbo": {
        displayName: "GPT-4 Turbo",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 10.0, // $10.00 / 1M tokens
          output_per_million_tokens: 30.0, // $30.00 / 1M tokens
        },
        contextWindow: "128k",
      },
      "gpt-3.5-turbo": {
        displayName: "GPT-3.5 Turbo",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 0.5, // $0.50 / 1M tokens
          output_per_million_tokens: 1.5, // $1.50 / 1M tokens
        },
        contextWindow: "16k", // Can be higher for specific versions
      },
      "dall-e-3": {
        displayName: "DALL-E 3 (Image Gen)",
        type: "image_generation",
        pricing: {
          // Pricing per image (standard quality)
          "1024x1024_standard_cost_per_image": 0.04, // $0.04 per image
          "1024x1024_hd_cost_per_image": 0.08, // $0.08 per image (HD)
          // Other sizes/qualities can be added if relevant and priced differently
        },
      },
      "whisper-large-v2": {
        displayName: "Whisper (Speech-to-Text)",
        type: "speech_to_text",
        pricing: {
          cost_per_minute: 0.006, // $0.006 per minute
        },
      },
    },
  },
  anthropic: {
    name: "Anthropic",
    models: {
      "claude-3-opus": {
        displayName: "Claude 3 Opus",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 15.0, // $15.00 / 1M tokens
          output_per_million_tokens: 75.0, // $75.00 / 1M tokens
        },
        contextWindow: "200k",
      },
      "claude-3-sonnet": {
        displayName: "Claude 3 Sonnet",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 3.0, // $3.00 / 1M tokens
          output_per_million_tokens: 15.0, // $15.00 / 1M tokens
        },
        contextWindow: "200k",
      },
      "claude-3-haiku": {
        displayName: "Claude 3 Haiku",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 0.25, // $0.25 / 1M tokens
          output_per_million_tokens: 1.25, // $1.25 / 1M tokens
        },
        contextWindow: "200k",
      },
    },
  },
  google: {
    name: "Google AI",
    models: {
      "gemini-1.5-pro": {
        displayName: "Gemini 1.5 Pro",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 7.0, // $7.00 / 1M tokens
          output_per_million_tokens: 21.0, // $21.00 / 1M tokens
        },
        contextWindow: "1M",
      },
      "gemini-1.5-flash": {
        displayName: "Gemini 1.5 Flash",
        type: "text_generation",
        pricing: {
          input_per_million_tokens: 0.35, // $0.35 / 1M tokens
          output_per_million_tokens: 1.05, // $1.05 / 1M tokens
        },
        contextWindow: "1M",
      },
      // You would add other Google models (e.g., Imagen, Text-to-Speech) here
      // with their specific pricing structures.
    },
  },
  // Add AWS Bedrock models here. Bedrock pricing can be complex as it depends on
  // the underlying model (e.g., Llama, Claude via Bedrock) and whether you use
  // on-demand or provisioned throughput. You'll need to define it carefully.
  /*
    "aws-bedrock": {
      name: "AWS Bedrock",
      models: {
        "anthropic.claude-3-sonnet-v1:0": {
          displayName: "Claude 3 Sonnet (Bedrock)",
          type: "text_generation",
          pricing: {
            input_per_million_tokens: 3.00, // Example, check Bedrock pricing specifically
            output_per_million_tokens: 15.00,
          },
          contextWindow: "200k",
        },
        // ... other Bedrock models like Llama, Cohere, AI21 Labs
      },
    },
    */
  // Add Azure OpenAI Service models here. Azure's pricing often mirrors OpenAI's
  // but can have slight regional or service-specific differences.
  /*
    "azure-openai": {
      name: "Azure OpenAI Service",
      models: {
        "gpt-4-turbo-azure": {
          displayName: "GPT-4 Turbo (Azure)",
          type: "text_generation",
          pricing: {
            input_per_million_tokens: 10.00, // Example, verify Azure specific pricing
            output_per_million_tokens: 30.00,
          },
          contextWindow: "128k",
        },
        // ... other Azure OpenAI models
      },
    },
    */
};
