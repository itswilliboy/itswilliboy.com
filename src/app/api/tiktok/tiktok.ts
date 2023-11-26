interface VideoMetadata {
  description: string
  creator: {
    nickname: string
    unique_id: string
  }
  downloadUrl: string
  aweme_id: string
}

interface TikTokResponse {
  video: ArrayBuffer | Blob
  content_type: string
  metadata: VideoMetadata
}

// slightly modified version of: https://stackoverflow.com/a/77178079
// https://regex101.com/r/ldPoYX/1
const TIKTOK_RE = /^.*https:\/\/(?:m|www|vm|vt)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|&item_id=)(?<aweme_id>\d+))|\w+)/
const BASE_URL = 'https://api16-normal-c-useast1a.tiktokv.com'

const headers = new Headers({
  'User-Agent': 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet'
})

export const revalidate = 3600

const queryVideo = async (awemeId: string): Promise<VideoMetadata> => {
  const req = await fetch(`${BASE_URL}/aweme/v1/feed/?aweme_id=${awemeId}&lr=unwatermarked`, {
    headers,
    next: {
      revalidate: 3600
    }
  })

  if (!req.ok) {
    throw new Error('Could not query video')
  }

  const resp = await req.json()
  if (resp.aweme_list.length < 1) {
    throw new Error('No video found.')
  }

  const video = resp.aweme_list[0]
  if (video.aweme_id !== awemeId) {
    throw new Error('Invalid video ID.')
  }

  return {
    description: video.desc,
    creator: {
      nickname: video.author.nickname,
      unique_id: video.author.unique_id
    },
    downloadUrl: video.video.play_addr.url_list[0] ?? video.video.download_addr.url_list[0],
    aweme_id: video.aweme_id
  }
}

const fetchVideo = async (url: string): Promise<{
  video: ArrayBuffer
  content_type: string
}> => {
  const req = await fetch(url, {
    headers,
    next: {
      revalidate: 3600
    }
  })

  if (!req.ok) {
    throw new Error('Could not download video')
  }

  const resp = await req.arrayBuffer()
  return {
    video: resp,
    content_type: req.headers.get('content-type') ?? 'video/mp4'
  }
}

const getAweme = async (url: string): Promise<string> => {
  const req = await fetch(url, {
    headers,
    redirect: 'follow',
    next: {
      revalidate: 3600
    }
  })

  if (!req.ok) {
    throw new Error('Could not get video ID.')
  }

  const match = req.url.match(TIKTOK_RE)?.groups?.aweme_id
  if (match == null) {
    throw new Error('Invalid TikTok URL.')
  }

  return match
}

const extractAweme = async (url: string): Promise<string> => {
  const match = url.match(TIKTOK_RE)
  if (match == null) {
    throw new Error('Please pass in a valid TikTok URL.')
  }

  if (match.groups?.aweme_id != null) {
    return match.groups.aweme_id
  }

  return await getAweme(url)
}

const downloadVideo = async (url: string): Promise<TikTokResponse> => {
  const awemeId = await extractAweme(url)
  const video = await queryVideo(awemeId)
  const resp = await fetchVideo(video.downloadUrl)

  return {
    ...resp,
    metadata: video
  }
}

export {
  downloadVideo
}

export type {
  TikTokResponse
}
