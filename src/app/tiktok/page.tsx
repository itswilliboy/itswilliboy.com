'use client'

import { useState } from 'react'
import TikTokForm from '../components/TikTokForm'

import type { TikTokResponse } from '../api/tiktok/tiktok'

export default function TikTok (): JSX.Element {
  const [video, setVideo] = useState<TikTokResponse | null>(null)

  return (
    <div className="w-screen min-h-screen bg-slate-900">
      <div className="flex flex-col items-center h-full pt-5">
        <TikTokForm
          videoSetter={setVideo}
        />

        {video !== null && (
          <div className="flex flex-col items-center pt-5">
            <video className="pb-5 rounded-sm h-screen" controls autoPlay>
              <source
                src={URL.createObjectURL(video.video as Blob)}
                type={video.content_type}
              />
              Your browser does not support videos.
            </video>

            <a
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              href={URL.createObjectURL(video.video as Blob)}
              download={`${video.metadata.aweme_id}.mp4`}
            >
              Download Video
            </a>

            <div className="max-w-screen-sm mb-10 px-3">
              <p className="font-semibold text-2xl">
                {video.metadata.creator.nickname}
                &nbsp;
                <a
                  className="text-base text-gray-500"
                  href={`https://www.tiktok.com/@${video.metadata.creator.unique_id}`}
                >
                  (@{video.metadata.creator.unique_id})
                </a>
              </p>

              <div className="h-0.5 w-full bg-gray-700 mb-2" />

              <p>{video.metadata.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
