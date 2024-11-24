import OpenAI from "openai";

export const extractSkillsFromText = async (text) => {
  const openai = new OpenAI({
    
    apiKey: "" 
  });

  try {
    const chatGPTResponse = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages: [
            { role: "user", content: "Identify and Look for only the technical skills mentioned in the following resume text and return them in the form of an array containing those skills" },
            { role: "assistant", content: text }
        ],
        max_tokens:150
    })
    const extractedSkillsString = chatGPTResponse.choices[0].message.content;
    const extractedSkillsArray = JSON.parse(extractedSkillsString);

    return extractedSkillsArray;
  } catch (error) {
    console.error("Error extracting skills using ChatGPT:", error);
    throw error; 
  }
};
