// ai-cost-calculator/src/components/CalculatorForm.js
import React, { useState, useEffect } from "react";
import { PRICING_DATA } from "../data/pricingData";
import Tooltip from "./Tooltip";
import "./CalculatorForm.css"; // Ensure this CSS file exists

const CalculatorForm = ({ onCalculate }) => {
  // State for form inputs
  const [selectedService, setSelectedService] = useState("openai");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [usageType, setUsageType] = useState("text_generation"); // Determined by model
  const [sampleContent, setSampleContent] = useState("");
  const [apiCalls, setApiCalls] = useState(1);
  const [outputTokenRatio, setOutputTokenRatio] = useState(1.0); // For text generation
  const [imageQuality, setImageQuality] = useState(
    "1024x1024_standard_cost_per_image"
  ); // For image generation
  const [audioMinutes, setAudioMinutes] = useState(1); // For speech-to-text
  const [isMonthly, setIsMonthly] = useState(false); // Toggle for monthly estimate

  // Effect to update available models and set default usage type when service changes
  useEffect(() => {
    const service = PRICING_DATA[selectedService];
    if (service) {
      const firstModelKey = Object.keys(service.models)[0];
      setSelectedModel(firstModelKey); // Set the first model of the new service
      setUsageType(service.models[firstModelKey].type); // Update usage type based on new model
    }
  }, [selectedService]);

  // Effect to update usage type when model changes (e.g., from GPT to DALL-E within OpenAI)
  useEffect(() => {
    const model = PRICING_DATA[selectedService]?.models[selectedModel];
    if (model) {
      setUsageType(model.type);
    }
  }, [selectedModel, selectedService]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onCalculate({
      service: selectedService,
      model: selectedModel,
      usageType,
      sampleContent,
      apiCalls: parseInt(apiCalls, 10) || 1, // Ensure number, default to 1
      outputTokenRatio: parseFloat(outputTokenRatio) || 1.0, // Ensure number, default to 1.0
      imageQuality,
      audioMinutes: parseFloat(audioMinutes) || 1, // Ensure number, default to 1
      isMonthly,
    });
  };

  const currentServiceModels = PRICING_DATA[selectedService]?.models || {};
  const currentModel = currentServiceModels[selectedModel];

  return (
    <form onSubmit={handleSubmit} className="calculator-form">
      {/* AI Service Selection */}
      <div className="form-group">
        <label htmlFor="service-selector">AI Service:</label>
        <select
          id="service-selector"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {Object.keys(PRICING_DATA).map((key) => (
            <option key={key} value={key}>
              {PRICING_DATA[key].name}
            </option>
          ))}
        </select>
      </div>

      {/* Model Selection */}
      <div className="form-group">
        <label htmlFor="model-selector">Model Selection:</label>
        <select
          id="model-selector"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {Object.keys(currentServiceModels).map((key) => (
            <option key={key} value={key}>
              {currentServiceModels[key].displayName}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Fields based on Usage Type */}
      {currentModel && currentModel.type === "text_generation" && (
        <>
          <div className="form-group">
            <label htmlFor="sample-content">
              Sample Content (Input):
              <Tooltip text="Paste sample text here. This will be used to estimate input tokens.">
                ?
              </Tooltip>
            </label>
            <textarea
              id="sample-content"
              rows="5"
              value={sampleContent}
              onChange={(e) => setSampleContent(e.target.value)}
              placeholder="e.g., 'Write a short story about a futuristic city with flying cars...'"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="output-token-ratio">
              Output Token Ratio (vs Input):
              <Tooltip text="Estimate how much longer the AI's output will be compared to your input. (e.g., 1.5 means output is 1.5x input length).">
                ?
              </Tooltip>
            </label>
            <input
              type="number"
              id="output-token-ratio"
              value={outputTokenRatio}
              onChange={(e) => setOutputTokenRatio(e.target.value)}
              min="0.1"
              step="0.1"
            />
          </div>
        </>
      )}

      {currentModel && currentModel.type === "image_generation" && (
        <div className="form-group">
          <label htmlFor="image-quality">
            Image Quality/Size:
            <Tooltip text="Select the desired image quality and size. Affects pricing for DALL-E.">
              ?
            </Tooltip>
          </label>
          <select
            id="image-quality"
            value={imageQuality}
            onChange={(e) => setImageQuality(e.target.value)}
          >
            <option value="1024x1024_standard_cost_per_image">
              1024x1024 Standard
            </option>
            <option value="1024x1024_hd_cost_per_image">1024x1024 HD</option>
            {/* Add other options based on your pricingData.js for DALL-E */}
          </select>
        </div>
      )}

      {currentModel && currentModel.type === "speech_to_text" && (
        <div className="form-group">
          <label htmlFor="audio-minutes">
            Audio Length (Minutes):
            <Tooltip text="Enter the total length of audio (in minutes) that will be processed per API call.">
              ?
            </Tooltip>
          </label>
          <input
            type="number"
            id="audio-minutes"
            value={audioMinutes}
            onChange={(e) => setAudioMinutes(e.target.value)}
            min="0.1"
            step="0.1"
          />
        </div>
      )}

      {/* Common Fields */}
      <div className="form-group">
        <label htmlFor="api-calls">
          Number of API Calls:
          <Tooltip text="How many times do you expect to make this API call per day (if 'Monthly' is unchecked) or per month (if 'Monthly' is checked)?">
            ?
          </Tooltip>
        </label>
        <input
          type="number"
          id="api-calls"
          value={apiCalls}
          onChange={(e) => setApiCalls(e.target.value)}
          min="1"
        />
      </div>

      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="monthly-usage-toggle"
          checked={isMonthly}
          onChange={(e) => setIsMonthly(e.target.checked)}
        />
        <label htmlFor="monthly-usage-toggle">
          Estimate Monthly Cost (Based on 30 days)
        </label>
      </div>

      <button type="submit" className="calculate-button">
        Calculate Costs
      </button>
    </form>
  );
};

export default CalculatorForm;
