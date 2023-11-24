import { downloadVideo } from './tiktok'

export async function GET (req: Request): Promise<Response> {
  const url = new URL(req.url)
  const tiktokUrl = url.searchParams.get('q')

  if (tiktokUrl == null) {
    return Response.json({
      message: 'Please provide a `tiktokUrl` parameter.'
    }, {
      status: 400
    })
  }

  try {
    const resp = await downloadVideo(tiktokUrl)

    return new Response(resp.video, {
      headers: {
        'Content-Type': resp.content_type,
        'X-Video-Metadata': encodeURIComponent(JSON.stringify(resp.metadata))
      }
    })
  } catch (err: any) {
    return Response.json({ message: err.message }, {
      status: 400
    })
  }
}
