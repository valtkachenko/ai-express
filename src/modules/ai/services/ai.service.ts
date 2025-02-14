import OpenAI from 'openai';
import { PromptResult } from '../types';

export const aiService = {
  client: new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  }),
  async prompt(content: string): Promise<PromptResult> {
    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          {
            role: 'user',
            content,
          },
        ],
        model: 'gpt-4o-mini',
        temperature: 0,
      });

      const result = completion?.choices[0]?.message?.content;

      return result
        ? {
            success: true,
            error: false,
            result,
          }
        : {
            success: false,
            error: false,
            result: '',
          };
    } catch (error) {
      console.log(
        'Error during processing gpt prompt or openAI service',
        error,
      );

      return {
        success: false,
        error: true,
        result: '',
      };
    }
  },
};
