import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const gemini = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// Function to generate general financial advice
export async function generateFinancialAdvice(prompt: string): Promise<string> {
  try {
    const response = await gemini.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Error generating financial advice:", error);
    throw new Error("Failed to generate financial advice");
  }
}

// Function to generate personalized financial advice based on user profile
export async function generatePersonalizedFinancialAdvice(
  user: any,
  question: string,
  area: string
): Promise<string> {
  const prompt = `
    User Profile:
    - Annual Income: $${user.annualIncome}
    - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
    - Current Savings: $${user.currentSavings}
    - Financial Goals: ${user.financialGoals.join(", ")}
    - Risk Tolerance: ${user.riskTolerance}

    Question: ${question}
    Area of Interest: ${area}

    Given the above, answer only if it's a question. Use Markdown. Avoid placeholder names or generic intros.
  `;

  try {
    const response = await gemini.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Error generating personalized financial advice:", error);
    throw new Error("Failed to generate personalized financial advice");
  }
}

// Function to generate a strategy for achieving a specific financial goal
export async function generateGoalStrategy(user: any, goal: any): Promise<string> {
  const targetDate = new Date(goal.targetDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const prompt = `
    User Profile:
    - Annual Income: $${user.annualIncome}
    - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
    - Current Savings: $${user.currentSavings}
    - Financial Goals: ${user.financialGoals.join(", ")}
    - Risk Tolerance: ${user.riskTolerance}

    Goal Details:
    - Type: ${goal.type}
    - Target Amount: $${goal.targetAmount}
    - Current Amount: $${goal.currentAmount}
    - Target Date: ${targetDate}

    Generate a clear, actionable financial strategy. Use Markdown. No user names or intros.
  `;

  try {
    const response = await gemini.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Error generating goal strategy:", error);
    throw new Error("Failed to generate goal strategy");
  }
}

// Function to generate a chat response based on conversation history
export async function generateChatResponse(
  messages: { role: string; content: string }[]
): Promise<string> {
  const prompt = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n");

  try {
    const response = await gemini.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Failed to generate chat response");
  }
}

export default gemini;
