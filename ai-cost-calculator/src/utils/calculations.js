// ai-cost-calculator/src/utils/calculations.js

import { PRICING_DATA } from "../data/pricingData";

/**
 * Calculates the cost for text generation models based on token usage.
 * @param {string} serviceKey - The key for the AI service (e.g., "openai").
 * @param {string} modelKey - The key for the specific model (e.g., "gpt-4o").
 * @param {number} inputTokens - Number of input tokens.
 * @param {number} outputTokens - Number of output tokens.
 * @returns {object} An object containing inputCost, outputCost, and totalCost.
 */
export const calculateTextGenerationCost = (
  serviceKey,
  modelKey,
  inputTokens,
  outputTokens
) => {
  const model = PRICING_DATA[serviceKey]?.models[modelKey];
  if (!model || model.type !== "text_generation") {
    console.error(
      `Pricing data not found or invalid type for model: ${serviceKey}.${modelKey}`
    );
    return { inputCost: 0, outputCost: 0, totalCost: 0 };
  }

  const { pricing } = model;
  const inputCost =
    (inputTokens / 1_000_000) * pricing.input_per_million_tokens;
  const outputCost =
    (outputTokens / 1_000_000) * pricing.output_per_million_tokens;
  const totalCost = inputCost + outputCost;

  return { inputCost, outputCost, totalCost };
};

/**
 * Calculates the cost for image generation models.
 * @param {string} serviceKey - The key for the AI service (e.g., "openai").
 * @param {string} modelKey - The key for the specific model (e.g., "dall-e-3").
 * @param {number} numberOfImages - Number of images to generate.
 * @param {string} qualitySize - The specific quality/size key for pricing (e.g., "1024x1024_standard_cost_per_image").
 * @returns {object} An object containing totalCost.
 */
export const calculateImageGenerationCost = (
  serviceKey,
  modelKey,
  numberOfImages,
  qualitySizeKey = "1024x1024_standard_cost_per_image"
) => {
  const model = PRICING_DATA[serviceKey]?.models[modelKey];
  if (
    !model ||
    model.type !== "image_generation" ||
    !model.pricing[qualitySizeKey]
  ) {
    console.error(
      `Pricing data not found or invalid type/quality for model: ${serviceKey}.${modelKey} (${qualitySizeKey})`
    );
    return { totalCost: 0 };
  }
  const costPerImage = model.pricing[qualitySizeKey];
  const totalCost = numberOfImages * costPerImage;
  return { totalCost };
};

/**
 * Calculates the cost for speech-to-text models based on audio minutes.
 * @param {string} serviceKey - The key for the AI service (e.g., "openai").
 * @param {string} modelKey - The key for the specific model (e.g., "whisper-large-v2").
 * @param {number} minutesOfAudio - Length of audio in minutes.
 * @returns {object} An object containing totalCost.
 */
export const calculateSpeechToTextCost = (
  serviceKey,
  modelKey,
  minutesOfAudio
) => {
  const model = PRICING_DATA[serviceKey]?.models[modelKey];
  if (!model || model.type !== "speech_to_text") {
    console.error(
      `Pricing data not found or invalid type for model: ${serviceKey}.${modelKey}`
    );
    return { totalCost: 0 };
  }
  const costPerMinute = model.pricing.cost_per_minute;
  const totalCost = minutesOfAudio * costPerMinute;
  return { totalCost };
};

/**
 * Formats a number as currency using USD.
 * @param {number} value - The numerical value to format.
 * @param {string} currency - The currency code (default: "USD").
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (value, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6, // Allow for small per-token costs
  }).format(value);
};
