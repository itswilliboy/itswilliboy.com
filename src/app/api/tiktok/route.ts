import rl from '../ratelimit'

import { downloadVideo } from './tiktok'

const pf = (contentType: string): string => {
  return contentType.split('/')[1]
}

export const GET = rl(async (req: Request): Promise<Response> => {
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
        'Content-Disposition': `attachment; filename="${resp.metadata.creator.unique_id} - ${resp.metadata.aweme_id}.${pf(resp.content_type)}"`,
        'X-Video-Metadata': encodeURIComponent(JSON.stringify(resp.metadata))
      }
    })
  } catch (err: any) {
    return Response.json({ message: err.message }, {
      status: 400
    })
  }
}, {
  limit: 5,
  per: 60 // seconds
})
