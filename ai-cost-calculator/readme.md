# AI Cost Calculator

A professional web application built with React to help users estimate costs for various AI services and models. This tool is designed to provide clear, actionable insights into AI implementation costs, suitable for both technical and non-technical users.

## Live Demo
TBD

## Features

-   **Multi-Service Support**: Calculate costs for:
    -   OpenAI (GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo, DALL-E 3, Whisper)
    -   Anthropic (Claude 3 Opus, Sonnet, Haiku)
    -   Google (Gemini 1.5 Pro, Gemini 1.5 Flash)
    -   *(Extendable to AWS Bedrock, Azure OpenAI Service and more models)*
-   **Dynamic Model Selection**: Model dropdowns dynamically update based on the selected AI service.
-   **Usage-Based Calculations**: Supports various AI usage types:
    -   Token usage (input/output tokens for text generation models)
    -   Image generation (cost per image for models like DALL-E)
    -   Speech-to-text (cost per minute for models like Whisper)
    -   Adjustable API calls for daily/monthly estimations.
-   **Intelligent Token Estimation**: Uses the `@dqbd/tiktoken` library for a more accurate client-side token count estimation from sample text input, especially for OpenAI-compatible models.
-   **Flexible Cost Views**:
    -   Per-request cost breakdown.
    -   Daily cost estimates.
    -   Monthly cost estimates (based on daily usage over 30 days).
-   **Detailed Cost Breakdown**: Clearly shows cost attribution (e.g., input vs. output tokens, or per-image/per-minute costs).
-   **Model Comparison**: Provides a side-by-side comparison table of estimated costs across different models for the same specified workload, helping users identify cost-effective options.
-   **Cost Optimization Recommendations**: Offers practical tips and strategies for reducing AI expenses.
-   **Responsive UI**: The design adapts seamlessly to various screen sizes (mobile, tablet, desktop) for optimal viewing and usability.
-   **Clean and Professional Design**: A modern, intuitive, and user-friendly interface suitable for B2B audiences, showcasing strong front-end development skills.
-   **User-Friendly Tooltips**: Explanations for technical terms like "tokens" and "API calls" improve accessibility for non-technical users.

## Technology Stack

-   **Frontend**: React (leveraging functional components and Hooks for efficient state management).
-   **Styling**: Pure CSS with CSS Variables for easy theme management and responsiveness.
-   **Tokenization**: `@dqbd/tiktoken` for robust client-side token estimation.
-   **Package Manager**: npm (or yarn).

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ai-cost-calculator.git](https://github.com/your-username/ai-cost-calculator.git)
    cd ai-cost-calculator
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or if you prefer yarn
    # yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    # or
    # yarn start
    ```
    This will open the application in your default browser at `http://localhost:3000`.

## Important Note on Pricing Data and "API Integration"

It's crucial to understand that major AI service providers (OpenAI, Anthropic, Google, AWS, Azure) **do not typically offer public, programmatic APIs to fetch their real-time pricing information.** Pricing models are often complex, subject to frequent changes, and usually published on their official documentation or pricing web pages.

Therefore, the pricing data used in this application is **hardcoded** within `src/data/pricingData.js`. To ensure the calculator provides the most accurate estimates, **you must manually update these values** by regularly checking the official pricing pages of the respective AI service providers. This approach is a practical and standard solution for building such a calculator given the current industry landscape.

## Future Enhancements / Bonus Features

This project serves as a strong foundation, and here are some ideas for future enhancements to demonstrate even more advanced skills:

-   **PDF Export**: Implement functionality to generate and download calculation results as a PDF document (e.g., using `jspdf` and `html2canvas`).
-   **Shareable Link**: Develop a feature to generate a unique URL that encodes the current input parameters, allowing users to share their specific calculation setups.
-   **Advanced Token Estimation**: Research and integrate more sophisticated client-side tokenizers or algorithms for a wider range of models or content types (e.g., code, structured data).
-   **Historical Pricing Trends**: (Requires external data source/manual collection) Integrate a charting library (like Chart.js or Recharts) to visualize how model pricing has changed over time.
-   **ROI Calculator**: Extend the calculator to include input fields for business metrics (e.g., estimated revenue increase, cost savings due to AI), providing an estimated Return on Investment.
-   **More Dynamic Usage Optimization Suggestions**: Enhance the recommendation engine to provide more context-aware and personalized suggestions based on the user's specific input and calculated costs.
-   **Dark/Light Mode Toggle**: Implement a simple toggle to switch between light and dark themes for improved user experience and accessibility.
-   **User Authentication and Save/Load**: Integrate a backend (e.g., Firebase Firestore, as discussed in previous turns, though not implemented here) to allow users to save and load their cost scenarios.

## Contribution

Feel free to fork this repository, submit pull requests, or open issues if you have suggestions for improvements or encounter any bugs. Your contributions are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).