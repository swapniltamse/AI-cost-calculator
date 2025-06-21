// ai-cost-calculator/src/App.js
import React, { useState } from "react";
import Header from "./components/Header";
import CalculatorForm from "./components/CalculatorForm";
import ResultsDisplay from "./components/ResultsDisplay";
import ComparisonTable from "./components/ComparisonTable";
import { PRICING_DATA } from "./data/pricingData";
import {
  calculateTextGenerationCost,
  calculateImageGenerationCost,
  calculateSpeechToTextCost,
} from "./utils/calculations";
import { estimateTokens } from "./utils/tokenEstimator";

import "./assets/styles/App.css"; // Main application styles
import "./assets/styles/variables.css"; // For CSS variables (e.g., themes)

function App() {
  // State to store the results of the main calculation
  const [calculationResults, setCalculationResults] = useState(null);
  // State to store results for the comparison table
  const [comparisonResults, setComparisonResults] = useState([]);

  /**
   * Handles the calculation logic when the form is submitted.
   * @param {object} formData - Data from the CalculatorForm.
   */
  const handleCalculate = (formData) => {
    const {
      service,
      model,
      usageType,
      sampleContent,
      apiCalls,
      outputTokenRatio,
      imageQuality,
      audioMinutes,
      isMonthly,
    } = formData;

    let perRequestCost = 0;
    let inputTokens = 0;
    let outputTokens = 0;
    let inputCostBreakdown = 0;
    let outputCostBreakdown = 0;
    let totalTokensUsed = 0;
    let otherCostBreakdown = {}; // For non-token based costs (images, audio)

    // Calculate per-request cost based on usage type
    if (usageType === "text_generation") {
      inputTokens = estimateTokens(sampleContent, model);
      outputTokens = Math.ceil(inputTokens * outputTokenRatio);
      const { totalCost, inputCost, outputCost } = calculateTextGenerationCost(
        service,
        model,
        inputTokens,
        outputTokens
      );
      perRequestCost = totalCost;
      inputCostBreakdown = inputCost;
      outputCostBreakdown = outputCost;
      totalTokensUsed = inputTokens + outputTokens;
    } else if (usageType === "image_generation") {
      // For image generation, assume 1 image per API call for per-request cost
      const { totalCost } = calculateImageGenerationCost(
        service,
        model,
        1, // Calculating for 1 image per request
        imageQuality
      );
      perRequestCost = totalCost;
      otherCostBreakdown = { "Cost Per Image": totalCost };
    } else if (usageType === "speech_to_text") {
      // For speech-to-text, assume audioMinutes is per API call for per-request cost
      const { totalCost } = calculateSpeechToTextCost(
        service,
        model,
        audioMinutes
      );
      perRequestCost = totalCost;
      otherCostBreakdown = { "Cost Per Minute": totalCost };
    }

    // Calculate total daily and monthly costs
    const dailyCost = perRequestCost * apiCalls;
    const monthlyCost = dailyCost * 30; // Assuming 30 days in a month for estimation

    // Set the results for the main display
    setCalculationResults({
      perRequestCost,
      dailyCost,
      monthlyCost,
      inputTokens: usageType === "text_generation" ? inputTokens : undefined,
      outputTokens: usageType === "text_generation" ? outputTokens : undefined,
      inputCostBreakdown:
        usageType === "text_generation"
          ? inputCostBreakdown * apiCalls * (isMonthly ? 30 : 1)
          : 0,
      outputCostBreakdown:
        usageType === "text_generation"
          ? outputCostBreakdown * apiCalls * (isMonthly ? 30 : 1)
          : 0,
      totalTokensUsed:
        usageType === "text_generation"
          ? totalTokensUsed * apiCalls * (isMonthly ? 30 : 1)
          : undefined,
      otherCostBreakdown:
        usageType !== "text_generation"
          ? { "Total Cost": perRequestCost * apiCalls * (isMonthly ? 30 : 1) }
          : undefined, // Simplify for non-token based
      apiCalls,
      isMonthly,
    });

    // --- Generate Comparison Results for the table ---
    const comparisonModels = [];
    const comparisonTypeDisplay = isMonthly ? "Monthly" : "Daily";

    // Loop through all services and models to build comparison data
    for (const svcKey in PRICING_DATA) {
      for (const mdlKey in PRICING_DATA[svcKey].models) {
        const mdl = PRICING_DATA[svcKey].models[mdlKey];

        // Only compare models of the same usage type as the current calculation
        if (mdl.type === usageType) {
          let estimatedCostForComparison = 0;

          if (usageType === "text_generation") {
            const { totalCost } = calculateTextGenerationCost(
              svcKey,
              mdlKey,
              inputTokens,
              outputTokens
            );
            estimatedCostForComparison =
              totalCost * apiCalls * (isMonthly ? 30 : 1);
          } else if (usageType === "image_generation") {
            const { totalCost } = calculateImageGenerationCost(
              svcKey,
              mdlKey,
              apiCalls,
              imageQuality
            ); // Use apiCalls as num of images
            estimatedCostForComparison = totalCost * (isMonthly ? 30 : 1);
          } else if (usageType === "speech_to_text") {
            const { totalCost } = calculateSpeechToTextCost(
              svcKey,
              mdlKey,
              audioMinutes * apiCalls
            ); // total minutes for period
            estimatedCostForComparison = totalCost * (isMonthly ? 30 : 1);
          }

          comparisonModels.push({
            serviceKey: svcKey,
            modelKey: mdlKey,
            estimatedCost: estimatedCostForComparison,
            typeDisplay: comparisonTypeDisplay,
          });
        }
      }
    }

    // Sort comparison results by estimated cost for easy viewing
    comparisonModels.sort((a, b) => a.estimatedCost - b.estimatedCost);
    setComparisonResults(comparisonModels);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="calculator-section">
          <CalculatorForm onCalculate={handleCalculate} />
        </div>
        <div className="results-section">
          <ResultsDisplay results={calculationResults} />
        </div>
        <div className="comparison-section">
          <ComparisonTable comparisonResults={comparisonResults} />
        </div>
      </main>
      {/* Footer */}
      <footer className="app-footer">
        <p>
          &copy; {new Date().getFullYear()} AI Cost Calculator. Pricing data is
          approximate and subject to frequent change. Always verify with
          official provider documentation.
        </p>
      </footer>
    </div>
  );
}

export default App;
