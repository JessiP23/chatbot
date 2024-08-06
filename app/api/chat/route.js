import { NextResponse } from "next/server"


// initial request

export function POST(req) {
    console.log('POST /api/chat')
    return NextResponse.json({message: "Hello from the server!"})
}


// error

// export default function POST(req) {
//     console.log('POST /api/chat')
//     return NextResponse.json({message: "Hello from the server!"})
// }