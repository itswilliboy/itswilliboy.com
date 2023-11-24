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
          <TikTokForm pageStateSetter={setState} videoSetter={setVideo} />
        </div>

        {video !== null && (
          <div>
            <video className="pt-10 pb-5 rounded-sm h-screen" controls autoPlay>
              <source
                src={URL.createObjectURL(video.video as Blob)}
                type={video.content_type}
              />
              Your browser does not support videos.
            </video>

            <p>
              { video.metadata.creator.nickname } (@{video.metadata.creator.unique_id})
            </p>
            <p>
              { video.metadata.description }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
