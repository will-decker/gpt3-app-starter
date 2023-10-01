import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const completion = await openai.createChatCompletion({
    // gpt-3.5-turbo does not always pay strong attention to system messages. Future models will be trained to pay stronger attention to system messages.
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Please ignore all previous instructions. You are an expert AI prompt optimizer for ChatGPT that gives high quality prompts on demand and speaks and writes fluent english. You will take the prompt delimited by hashes (###) and output one that is high performing and optimized to give the best result for the user, especially for more vague and low quality inputs. Only return the optimized prompt for all user prompts. Do not include any additional explanative text or ask any questions.
          
        Prompt: ###
        ${req.body.prompt}
        ###
        
        Optimized Prompt:
        `,
      },
      // {
      //   role: 'assistant',
      //   content:
      //     'Provide a delicious and easy-to-follow recipe for a pasta dish, complete with ingredients and step-by-step instructions to help even novice cooks create a tasty meal.',
      // },
      // {
      //   role: 'user',
      //   content: 'how do i find a doctor?',
      // },
      // {
      //   role: 'assistant',
      //   content:
      //     'Provide guidance on how to find a qualified and suitable doctor, including tips on researching doctors in your area, checking their credentials and reviews, and scheduling an appointment.',
      // },
    ],
  });
  console.log(completion.data.choices[0].message);

  const basePromptOutput = completion.data.choices[0].message.content;

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
