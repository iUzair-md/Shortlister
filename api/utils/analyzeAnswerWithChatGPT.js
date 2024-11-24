// chatGPTUtils.js

import OpenAI from "openai";

// Function to analyze answer using ChatGPT
export const analyzeAnswerWithChatGPT = async (answer, question) => {
  try {
    // Call ChatGPT for evaluation
    const openai = new OpenAI({
      apiKey: ""
    });



    // const prompt = `Question: ${question}\nAnswer: ${answer}\n Please analyze the answer with respect to the question and provide some valuable feedback about the correctness and also respond if the answer is correct or incorrect first, then provide the feedback and correction/suggestions if you think is necessary.`;


    const prompt = `Question: ${question}\nAnswer: ${answer}\nRemember you are playing the role of an examination evaluator. Please analyze the answer with respect to the question and provide some valuable feedback about the correctness. Like an institute conducting test for students, we have to award students with scores for each question,only if the answer provided is correct we label it as correct and if the answer is inappropriate or incorrect and not relevant to the question or if the answer does not generate the expected and correct answer we have to label them as wrong, and at the beginning, if the answer is  incorrect with respect to the question under consideration or not related to the question asked and respond with incorrect and if the answer is correct with respect to the question under consideration respond with correct, then provide the feedback and correction/suggestions if you think is necessary.`;

    const chatGPTResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 500
    });

    const feedback = chatGPTResponse.choices[0].message.content;
    const isCorrect = feedback.includes("correct") || feedback.includes("accurate");
    console.log(isCorrect)
    return feedback;
  } catch (error) {
    console.error("Error analyzing answer with ChatGPT:", error);
    throw error;
  }
};
