// ai-cost-calculator/src/components/ComparisonTable.js
import React from "react";
import { formatCurrency } from "../utils/calculations";
import { PRICING_DATA } from "../data/pricingData";
import "./ComparisonTable.css"; // Ensure this CSS file exists

const ComparisonTable = ({ comparisonResults }) => {
  if (!comparisonResults || comparisonResults.length === 0) {
    return (
      <div className="comparison-container">
        <h2>Model Comparison</h2>
        <p>
          Run a calculation to see how different models compare for the same
          workload.
        </p>
      </div>
    );
  }

  // Determine the display type (Daily/Monthly) from the first result if available
  const typeDisplay =
    comparisonResults.length > 0 ? comparisonResults[0].typeDisplay : "Cost";

  return (
    <div className="comparison-container">
      <h2>Model Comparison</h2>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Model</th>
            <th>Context Window</th>
            <th>Input (1M tokens)</th>
            <th>Output (1M tokens)</th>
            <th>Estimated {typeDisplay} Cost</th>
          </tr>
        </thead>
        <tbody>
          {comparisonResults.map((result, index) => {
            const serviceData = PRICING_DATA[result.serviceKey];
            const modelData = serviceData?.models[result.modelKey];

            // Only render text generation models in the comparison table for simplicity
            // or extend this to handle other types more generically if desired.
            if (modelData?.type !== "text_generation") {
              return null; // Skip non-text generation models in this comparison context
            }

            return (
              <tr key={index}>
                <td>{serviceData?.name || "N/A"}</td>
                <td>{modelData?.displayName || "N/A"}</td>
                <td>{modelData?.contextWindow || "N/A"}</td>
                <td>
                  {modelData?.pricing?.input_per_million_tokens
                    ? formatCurrency(modelData.pricing.input_per_million_tokens)
                    : "N/A"}
                </td>
                <td>
                  {modelData?.pricing?.output_per_million_tokens
                    ? formatCurrency(
                        modelData.pricing.output_per_million_tokens
                      )
                    : "N/A"}
                </td>
                <td>
                  <strong>{formatCurrency(result.estimatedCost)}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
