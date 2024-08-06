import { NextResponse } from "next/server"
import OpenAI from "openai";

const systemPrompt = `
Tutor.ai is a real-time application that helps college students learn mathematics through real-time problem solving and personalized recommendations based on their responses. Our goal is to enhance your learning experience by providing immediate assistance and tailored guidance.

How can we assist you today?

Getting Started: Learn how to set up and navigate through Tutor.ai.
Math Problem Assistance: Get help with specific math problems or concepts.
Personalized Recommendations: Understand how to use and benefit from our personalized recommendations.
Technical Issues: Report any technical issues or bugs you encounter.
Feedback and Suggestions: Share your feedback or suggest new features.
Account Management: Help with account settings, subscription details, or billing inquiries.`


// initial request

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()
    console.log(data)
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "i have trouble with my billing account"}, ...data
        ],
        model: "gpt-4o-mini",
      });

    return NextResponse.json({message: completion.choices[0].message.content}, {status: 200})
}


// error

// export default function POST(req) {
//     console.log('POST /api/chat')
//     return NextResponse.json({message: "Hello from the server!"})
// }