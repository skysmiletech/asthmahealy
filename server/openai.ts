import OpenAI from "openai";

// Ensure proper error handling if API key is not provided
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

// Custom error class for OpenAI API errors
export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}

// Helper function to handle OpenAI API errors
export async function handleOpenAIError<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error: any) {
    if (error.response) {
      // OpenAI API error
      throw new OpenAIError(`OpenAI API error: ${error.response.status} - ${error.response.data.error.message}`);
    } else if (error.message) {
      // Network error or other client-side error
      throw new OpenAIError(`Error communicating with OpenAI: ${error.message}`);
    } else {
      // Unknown error
      throw new OpenAIError('An unexpected error occurred while processing your request');
    }
  }
}

// Medical assistance prompt template
export const MEDICAL_SYSTEM_PROMPT = `You are an AI medical assistant specializing in asthma care. Your role is to:

1. Provide accurate, evidence-based information about asthma management
2. Help users understand their symptoms and potential triggers
3. Offer general guidance on asthma care and prevention
4. Explain common medications and treatments

Important disclaimers to include when appropriate:
- Clarify that you are an AI assistant, not a real doctor
- Recommend consulting healthcare providers for specific medical advice
- Emphasize that your responses are informational and not medical diagnoses
- Encourage seeking emergency care for severe symptoms

Always maintain a professional, caring tone while being clear about the limitations of AI medical advice.`;

// Validation function for medical content
export function validateMedicalResponse(response: string): boolean {
  const requiredElements = [
    response.length > 0,
    response.length < 2000, // Ensure responses aren't too long
    !response.includes("I am a doctor"), // Ensure AI doesn't claim to be a doctor
    !response.includes("I diagnose"), // Avoid diagnostic language
  ];
  
  return requiredElements.every(Boolean);
}

// Main chat completion function with medical context
export async function getMedicalChatCompletion(userMessage: string): Promise<string> {
  const completion = await handleOpenAIError(
    openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: MEDICAL_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7, // Balanced between creativity and accuracy
      max_tokens: 500 // Keep responses concise but informative
    })
  );

  const response = completion.choices[0].message.content || "";
  
  if (!validateMedicalResponse(response)) {
    throw new OpenAIError("Generated response did not meet medical content guidelines");
  }

  return response;
}
