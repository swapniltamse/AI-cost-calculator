// ai-cost-calculator/src/utils/tokenEstimator.js
import { encoding_for_model } from "@dqbd/tiktoken";

// A mapping to the tokenizer encoding names for different models.
// Note: For non-OpenAI models, 'cl100k_base' is used as a common approximation.
// True token counts for Anthropic/Google/AWS may differ slightly without their specific tokenizers.
const TOKENIZER_MAP = {
  "gpt-4o": "o200k_base", // Specific tokenizer for GPT-4o
  "gpt-4-turbo": "cl100k_base", // Common tokenizer for GPT-4/3.5 family
  "gpt-3.5-turbo": "cl100k_base",
  // Using cl100k_base as a general approximation for other LLMs.
  // For precise token counts, you'd need the exact tokenizer used by each provider.
  "claude-3-opus": "cl100k_base",
  "claude-3-sonnet": "cl100k_base",
  "claude-3-haiku": "cl100k_base",
  "gemini-1.5-pro": "cl100k_base",
  "gemini-1.5-flash": "cl100k_base",
  // Add more as needed if you find specific tokenizer mappings
};

/**
 * Estimates the number of tokens in a given text for a specific model.
 * Uses `@dqbd/tiktoken` for OpenAI-compatible models and falls back to a character-based
 * estimation for others or if a specific tokenizer isn't found.
 * @param {string} text - The input text content.
 * @param {string} modelName - The key of the model (e.g., "gpt-4o", "claude-3-sonnet").
 * @returns {number} The estimated number of tokens.
 */
export const estimateTokens = (text, modelName) => {
  if (!text) {
    return 0;
  }

  try {
    // Attempt to use a specific tokenizer if mapped, otherwise default to a common one
    const encodingName = TOKENIZER_MAP[modelName] || "cl100k_base";
    const encoder = encoding_for_model(encodingName);
    const tokens = encoder.encode(text);
    encoder.free(); // Important: free the encoder to prevent memory leaks
    return tokens.length;
  } catch (error) {
    console.warn(
      `Could not find specific tokenizer for model "${modelName}" or encountered an error. ` +
        `Falling back to character-based estimation. Error:`,
      error
    );
    // Fallback: A very rough estimate (e.g., 4 characters per token)
    return Math.ceil(text.length / 4);
  }
};
