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
      { role: 'user', content: 'Summarize the article so I can read it fast.' },
      {
        role: 'assistant',
        content:
          'Provide a concise summary of the article that can be quickly read and understood.',
      },
      { role: 'user', content: `${req.body.prompt}` },
    ],
  });
  console.log(completion.data.choices[0].message);

  const basePromptOutput = completion.data.choices[0].message.content;

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
