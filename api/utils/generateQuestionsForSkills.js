import OpenAI from "openai";


export const generateQuestionsForSkills = async (skills) => {
  const openai = new OpenAI({
    apiKey: ""
  });

  try {
    const questionsList = [];

    // Loop through each skill and generate questions
    for (const skill of skills) {
      const chatGPTResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: "user", content: `Generate 3 coding interview level questions for the mentioned skill and return only the questions in a valid JSON: ${skill}` }
        ],
        max_tokens: 150
      });

      const extractedQuestionsString = chatGPTResponse.choices[0].message.content;
      console.log(extractedQuestionsString)
      const extractedQuestionsArray = JSON.parse(extractedQuestionsString);

      // Add generated questions to the list
      questionsList.push({ skill, questions: extractedQuestionsArray });
    }

    return questionsList;
  } catch (error) {
    console.error("Error generating questions using ChatGPT:", error);
    throw error;
  }
};