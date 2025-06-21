// ai-cost-calculator/src/components/ResultsDisplay.js
import React from "react";
import { formatCurrency } from "../utils/calculations";
import "./ResultsDisplay.css"; // Ensure this CSS file exists

const ResultsDisplay = ({ results }) => {
  if (!results) {
    return (
      <div className="results-container">
        <p>Enter details and click "Calculate" to see cost estimates.</p>
      </div>
    );
  }

  const {
    perRequestCost,
    dailyCost,
    monthlyCost,
    inputTokens,
    outputTokens,
    inputCostBreakdown,
    outputCostBreakdown,
    totalTokensUsed,
    otherCostBreakdown, // For image/audio
    apiCalls,
    isMonthly,
  } = results;

  return (
    <div className="results-container">
      <h2>Cost Estimates</h2>
      <div className="cost-summary">
        <p>
          <strong>Cost Per Request:</strong> {formatCurrency(perRequestCost)}
        </p>
        {!isMonthly && (
          <p>
            <strong>Daily Estimate ({apiCalls} calls):</strong>{" "}
            {formatCurrency(dailyCost)}
          </p>
        )}
        {isMonthly && (
          <p>
            <strong>Monthly Estimate ({apiCalls} calls/day):</strong>{" "}
            {formatCurrency(monthlyCost)}
          </p>
        )}
      </div>

      <h3>Breakdown</h3>
      <div className="cost-breakdown">
        {/* Display token-based breakdown only for text generation */}
        {inputTokens !== undefined && (
          <p>
            Input Tokens: {inputTokens.toLocaleString()} (Cost:{" "}
            {formatCurrency(inputCostBreakdown)})
          </p>
        )}
        {outputTokens !== undefined && (
          <p>
            Output Tokens: {outputTokens.toLocaleString()} (Cost:{" "}
            {formatCurrency(outputCostBreakdown)})
          </p>
        )}
        {totalTokensUsed !== undefined && (
          <p>Total Tokens: {totalTokensUsed.toLocaleString()}</p>
        )}
        {/* Display other breakdowns (e.g., image costs, audio minutes) */}
        {otherCostBreakdown &&
          Object.keys(otherCostBreakdown).length > 0 &&
          Object.entries(otherCostBreakdown).map(([key, value]) => (
            <p key={key}>
              {key}: {formatCurrency(value)}
            </p>
          ))}
      </div>

      <h3>Cost Optimization Recommendations:</h3>
      <ul className="recommendations">
        <li>
          Consider using more cost-effective models (e.g., Flash/Haiku/GPT-3.5)
          for simpler tasks where maximum intelligence isn't required.
        </li>
        <li>
          Optimize your prompts to be concise and effective, reducing both input
          and output token count.
        </li>
        <li>
          Utilize batch processing for large workloads if the AI provider offers
          batch discounts or specific endpoints.
        </li>
        <li>
          For consistent, high-volume usage, explore commitment plans or
          provisioned throughput options directly with the AI provider, as these
          often offer significant discounts.
        </li>
        <li>
          Implement caching for frequently used responses to avoid repeated API
          calls.
        </li>
      </ul>
    </div>
  );
};

export default ResultsDisplay;
