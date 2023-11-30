'use client'

import { useState } from 'react'
import TikTokForm from '../components/TikTokForm'

import type { TikTokResponse } from '../api/tiktok/tiktok'

export default function TikTok (): JSX.Element {
  const [video, setVideo] = useState<TikTokResponse | null>(null)

  return (
    <div className="w-screen min-h-screen bg-slate-900">
      <div className="flex flex-col items-center h-screen pt-5">
        <TikTokForm videoSetter={setVideo} />

        {video !== null && (
          <div className="flex flex-row mt-5 w-screen justify-center pl-[350px]">
            <div className="flex flex-col">
              <video
                className="w-[350px] rounded-tl-lg rounded-bl-lg"
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
            <div className="w-[350px] px-4 bg-slate-800 rounded-tr-lg rounded-br-lg pt-3">
              <p className="font-semibold text-2xl pl-3">
                {video.metadata.creator.nickname}
                <br />
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
                {video.metadata.description !== null && (
                  <p className="pb-1 font-medium">{video.metadata.description.caption}</p>
                )}
                <div>
                  {video.metadata.description.tags.map((i) => {
                    return (
                      <a
                        href={`https://www.tiktok.com/tag/${i}`}
                        key={i}
                        target="_blank"
                      >
                        <span className="text-white/50 hover:text-white/90 font-medium transition-colors duration-300">
                          #{i}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <a
                  href={URL.createObjectURL(video.video as Blob)}
                  download={`${video.metadata.aweme_id}.${
                    video.content_type.split('/')[1]
                  }`}
                  type={video.content_type}
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg w-72 text-center transition-colors duration-300"
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
