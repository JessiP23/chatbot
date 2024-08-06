import { NextResponse } from "next/server"


// initial request

export async function POST(req) {
    const data = await req.json()
    console.log(data);
    return NextResponse.json({message: "Hello from the server!"})
}


// error

// export default function POST(req) {
//     console.log('POST /api/chat')
//     return NextResponse.json({message: "Hello from the server!"})
// }