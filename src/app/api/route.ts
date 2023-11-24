export async function GET (_req: Request): Promise<Response> {
  return Response.json({
    response: 'Pong!'
  })
}
