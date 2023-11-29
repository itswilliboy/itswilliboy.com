'use client'

import { useState } from 'react'
import TikTokForm from '../components/TikTokForm'

import type { TikTokResponse } from '../api/tiktok/tiktok'

interface videoDescription {
  caption: string
  hashtags: string[]
}

const getVideoDescription = (str: string): videoDescription => {
  const split = str.split('#')
  const caption = split.shift() ?? ''
  return {
    caption,
    hashtags: split
  }
}

export default function TikTok (): JSX.Element {
  const [video, setVideo] = useState<TikTokResponse | null>(null)

  return (
    <div className="w-screen min-h-screen bg-slate-900">
      <div className="flex flex-col items-center h-full pt-5">
        <TikTokForm videoSetter={setVideo} />

        {video !== null && (
          <div className="flex flex-row mt-5 w-screen justify-center pl-[450px]">
            <div className="flex flex-col">
              <video
                className="w-[450px] rounded-tl-lg rounded-bl-lg"
                onLoadStart={(e) => {
                  e.currentTarget.volume = 0.5
                }}
                controls
                autoPlay
              >
                <source
                  src={URL.createObjectURL(video.video as Blob)}
                  type={video.content_type}
                />
                Your browser does not support videos.
              </video>
            </div>
            <div className="w-[450px] px-4 bg-slate-800 rounded-tr-lg rounded-br-lg pt-2">
              <p className="font-semibold text-2xl pl-3">
                {video.metadata.creator.nickname}
                &nbsp;
                <a
                  className="text-base text-gray-400 hover:text-gray-100 transition-colors"
                  href={`https://www.tiktok.com/@${video.metadata.creator.unique_id}`}
                  target="_blank"
                >
                  (@{video.metadata.creator.unique_id})
                </a>
              </p>

              <div className="h-1 bg-gray-700 m-2" />

              <div className="break-words mb-5 pl-3">
                {getVideoDescription(video.metadata.description) !== null && (
                  <p>
                    {getVideoDescription(video.metadata.description).caption}
                  </p>
                )}
                {getVideoDescription(video.metadata.description).hashtags.map(
                  (i) => {
                    return (
                      <a
                        href={`https://www.tiktok.com/tag/${i}`}
                        key={i}
                        target="_blank"
                      >
                        <span className="text-white/50 hover:text-white/90 font-medium transition-colors duration-300">
                          #{i}&nbsp;
                        </span>
                      </a>
                    )
                  }
                )}
              </div>

              <div className="flex w-[418px] items-center justify-center">
                <a
                  href={URL.createObjectURL(video.video as Blob)}
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg w-96 text-center transition-colors duration-300"
                >
                  Download Video
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
