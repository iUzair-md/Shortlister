// analyzeBinaryAnswerWithChatGPT.js

import OpenAI from 'openai';

export const analyzeBinaryAnswerWithChatGPT = async (answer, question) => {
  try {
    // Call ChatGPT for evaluation
    const openai = new OpenAI({
      apiKey: ''
    });

    // Construct the prompt
    const prompt = `Question: ${question}\nAnswer: ${answer}\nRemember you are playing the role of an examination evaluator. Please analyze the answer with respect to the question about the correctness. Like an institute conducting test for students, we have to award students with scores for each question,only if the answer provided is correct we label it as correct and if the answer is inappropriate or incorrect and not relevant to the question or if the answer does not generate the expected and correct answer we have to label them as wrong or incorrect, and at the beginning, if the answer is incorrect with respect to the question under consideration or not related to the question asked,  respond with incorrect and if the answer is correct only with respect to the question under consideration respond with correct`;

    // Send request to ChatGPT
    const chatGPTResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 50, // Limit the response to one word
      stop: '\n' // Stop generation at the first line break
    });

    // Extract the response
    const feedback = chatGPTResponse.choices[0].message.content.trim().toLowerCase();

    // Ensure the response is either 'correct' or 'incorrect'
    if (feedback !== 'correct' && feedback !== 'incorrect') {
      throw new Error('Unexpected response from ChatGPT');
    }

    return { result: feedback };
  } catch (error) {
    console.error('Error analyzing answer with ChatGPT:', error);
    throw error;
  }
};
