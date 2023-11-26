import { type NextRequest } from 'next/server'

export const GET = async (_: NextRequest): Promise<Response> => {
  return Response.json({
    response: 'Pong!'
  })
}

export const runtime = 'edge'
