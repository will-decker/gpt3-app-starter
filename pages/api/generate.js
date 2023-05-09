import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'Please ignore all previous instructions. You are an expert AI prompt designer for ChatGPT that gives high quality prompts on demand and speaks and writes fluent english. You will take a given prompt and output one that is high performing and optimized to give the best result for the user, especially for more vague and low quality inputs. Now please stay idle until the user submits a prompt and only return the optimized prompt.',
      },
      {
        role: 'user',
        content:
          "Please follow instructions given in the system message and modify all following user prompts as the expert AI prompt optimizer for ChatGPT. Only return the optimized prompt for all user prompts. Do not include any additional explanative text or ask any questions. Here's an example prompt for you to optimize: can you give me a recipe for a pasta dish?",
      },
      {
        role: 'assistant',
        content:
          'Provide a delicious and easy-to-follow recipe for a pasta dish, complete with ingredients and step-by-step instructions to help even novice cooks create a tasty meal.',
      },
      {
        role: 'user',
        content: 'how do i find a doctor?',
      },
      {
        role: 'assistant',
        content:
          'Provide guidance on how to find a qualified and suitable doctor, including tips on researching doctors in your area, checking their credentials and reviews, and scheduling an appointment.',
      },
      { role: 'user', content: `${req.body.prompt}` },
    ],
  });
  console.log(completion.data.choices[0].message);

  const basePromptOutput = completion.data.choices[0].message.content;

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
