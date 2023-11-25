'use client'

import { useState } from 'react'
import TikTokForm from '../components/TikTokForm'

import type { TikTokResponse } from '../api/tiktok/tiktok'

export default function TikTok (): JSX.Element {
  const [state, setState] = useState<{
    isLoading: boolean
    errorMessage: string | null
  }>({ isLoading: false, errorMessage: null })
  const [video, setVideo] = useState<TikTokResponse | null>(null)

  return (
    <div className="w-screen min-h-screen bg-slate-900">
      <div className="flex flex-col items-center h-full">
        {state.isLoading && (
          <h1 className="text-white absolute transform -translate-y-24 text-3xl">
            Loading...
          </h1>
        )}

        {state.errorMessage !== null && (
          <p className="text-red-500 absolute transform -translate-y-16 text-md">
            {state.errorMessage}
          </p>
        )}

        <div className="pt-5">
          <TikTokForm
            pageStateSetter={setState}
            pageState={state}
            videoSetter={setVideo}
          />
        </div>

        {video !== null && (
          <div className="flex flex-col items-center w-auto">
            <video className="pt-10 pb-5 rounded-sm h-screen" controls autoPlay>
              <source
                src={URL.createObjectURL(video.video as Blob)}
                type={video.content_type}
              />
              Your browser does not support videos.
            </video>
            <a
              className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
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
