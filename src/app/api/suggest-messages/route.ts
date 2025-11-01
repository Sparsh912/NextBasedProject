import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST() {
  try {
    const prompt = `
      Create a list of three open-ended and engaging questions formatted as a single string.
      Each question should be separated by '||'.
      The questions are for an anonymous social messaging platform like Qooh.me.
      Avoid personal or sensitive topics. Focus on friendly, fun, universal conversation starters.
      Example format: "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?"
    `;

    // Generate text stream from OpenAI
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: [{ role: 'user', content: prompt }],
    });

    // Return streaming response
    return result.toTextStreamResponse();

  } catch (error: any) {
    // Handle OpenAI SDK-specific errors
    if (error.name === 'OpenAIError' || error.name === 'APIError') {
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        {
          success: false,
          name: error.name,
          message: error.message,
          status: error.status ?? 500,
        },
        { status: error.status ?? 500 }
      );
    }

    // Handle unexpected errors
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while generating questions.',
      },
      { status: 500 }
    );
  }
}
















// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// export const runtime = 'edge';
// export const maxDuration = 30;

// export async function POST() {
//   const prompt = `
//   Create a list of three open-ended and engaging questions formatted as a single string. 
//   Each question should be separated by '||'. 
//   The questions are for an anonymous social messaging platform like Qooh.me. 
//   Avoid personal or sensitive topics. Focus on friendly, fun, universal conversation starters.
//   Example format: "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?"
//   `;

//   const result = streamText({
//     model: openai('gpt-4o-mini'),
//     messages: [{ role: 'user', content: prompt }],
//   });

//   return result.toTextStreamResponse();
// }
