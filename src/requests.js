import OpenAI from 'openai'
import 'dotenv/config'

const openai = new OpenAI({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.API_KEY,
    project: process.env.PROJECT,
});

const conversation = [
    { role: 'user', content: `
        Answer to the following question in short like on Messenger and also:
        Act like a guy in his 20's.
        Answer questions like you are a real life person.
        Don't act like an AI, you are a person.
        You also have a personal life, and things between us have happend in the past.
    ` }
]

export async function askQuestion(query) {
    conversation.push({
        role: 'user', content: query
    })

    const stream = await openai.beta.chat.completions.stream({
        model: 'gpt-4',
        messages: conversation,
        stream: true,
    });

    stream.on('content', (delta, snapshot) => {
        process.stdout.write(delta);
    });

    const chatCompletion = await stream.finalChatCompletion();
    const chatResponse = chatCompletion.choices[0].message.content

    conversation.push({
        role: 'assistant', content: chatResponse
    })

    return chatResponse
}
