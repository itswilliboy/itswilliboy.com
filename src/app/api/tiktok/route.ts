type Option<T> = T | null

const BASE_URL = 'https://api16-normal-c-useast1a.tiktokv.com'
const headers = new Headers()
headers.append('User-Agent', 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet')

export const revalidate = 3600

const queryVideo = async (awemeId: string): Promise<Option<{
  downloadUrl: string
  description: string
}>> => {
  const req = await fetch(`${BASE_URL}/aweme/v1/feed/?aweme_id=${awemeId}&lr=unwatermarked`, {
    headers
  })
  if (!req.ok) {
    return null
  }

  const resp = await req.json()
  if (resp.aweme_list.length < 1) {
    return null
  }

  const video = resp.aweme_list[0]
  return {
    description: video.desc,
    downloadUrl: video.video.download_addr.url_list[0]
  }
}

const fetchVideo = async (url: string): Promise<Option<{
  video: ArrayBuffer
  content_type: string
}>> => {
  const req = await fetch(url, {
    headers
  })

  if (!req.ok) {
    return null
  }

  const resp = await req.arrayBuffer()
  return {
    video: resp,
    content_type: req.headers.get('content-type') ?? 'video/mp4'
  }
}

export async function GET (req: Request): Promise<Response> {
  const url = new URL(req.url)
  const awemeId = url.searchParams.get('q')

  if (awemeId == null) {
    return Response.json({
      message: 'Missing awemeId'
    }, {
      status: 400
    })
  }

  const video = await queryVideo(awemeId)
  if (video == null) {
    return Response.json({
      message: 'Video not found'
    }, {
      status: 404
    })
  }

  const resp = await fetchVideo(video.downloadUrl)
  if (resp == null) {
    return Response.json({
      message: 'Video not found'
    }, {
      status: 404
    })
  }

  return new Response(resp.video, {
    headers: {
      'Content-Type': resp.content_type,
      'Video-Description': video.description
    }
  })
}
