import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBWEkfzPbQ-lzGeS5s8kn5OOThAeIbWq6I');

export async function getDestinationInfo(destination: string, days: number, budget: number) {
  try {
    // Define a simple logic to check if the budget is sufficient based on days
    const isBudgetSufficient = budget >= days * 50; // Example: Assuming $50 per day

    if (!isBudgetSufficient) {
      return {
        name: destination,
        description: `The requested budget of ${budget} USD is not applicable for ${days} days at ${destination}. Please adjust your budget.`,
        attractions: ['This destination is not suitable for your budget. Please increase your budget.'],
      };
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a travel expert. Please create a detailed travel plan for the destination '${destination}' considering the following details:
    - Duration: ${days} days
    - Budget: ${budget} USD
    The plan should include:
    1. A concise description of the destination suitable for this duration and budget.
    2. A list of top attractions (maximum of 5) that align with the budget and duration.
    3. The special famous foods ans the ticket prices.
    Return ONLY a JSON object with exactly this format:
    {
      "description": "A 2-19 sentence description based on the duration and budget",
      "attractions": ["attraction1", "attraction2", "attraction3", "attraction4", "attraction5"]
       "foods": ["Food1", "Food2", "Food3", "Food4", "Food5"]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();  // Ensure it's awaited

    // Log the raw response to debug
    console.log("Raw API Response:", text);

    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      console.log("Cleaned API Response:", cleanedText);  // Log the cleaned response

      // Try parsing the cleaned text into JSON
      const parsedData = JSON.parse(cleanedText);

      // Validate the response structure
      if (!parsedData.description || !Array.isArray(parsedData.attractions)) {
        throw new Error('Invalid response format');
      }

      return {
        description: parsedData.description,
        attractions: parsedData.attractions.slice(0, 5),
        name: destination
      };
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching destination info:', error);
    return {
      name: destination,
      description: `Discover the wonders of ${destination} names and location name. This beautiful destination offers a unique blend of culture, attractions, and experiences for travelers and the special famous foods ans the ticket prices.`,
      attractions: [
        'Popular Landmark',
        'Local Market',
        'Historical Site',
        'Cultural Center',
        'Nature Spot'
      ]
    };
  }
}
