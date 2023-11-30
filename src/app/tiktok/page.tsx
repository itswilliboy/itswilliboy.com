'use client'

import { useState } from 'react'
import TikTokForm from '../components/TikTokForm'

import type { TikTokResponse } from '../api/tiktok/tiktok'
import Image from 'next/image'

const Stat = ({ src, value }: { src: string, value: number }): JSX.Element => {
  const formatted = Intl.NumberFormat('en', { notation: 'compact' }).format(
    value
  )
  return (
    <div className="inline-flex items-center opacity-50">
      <Image src={src} alt={value.toString()} width={24} height={24} />
      <span className="text-lg pl-1">{formatted}</span>
    </div>
  )
}

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
            <div className="w-[350px] px-6 bg-slate-800 rounded-tr-lg rounded-br-lg pt-3">
              <p className="flex flex-col text-2xl font-semibold">
                {video.metadata.creator.nickname}
                <a
                  className="text-base text-gray-400 hover:text-gray-100 transition-colors"
                  href={`https://www.tiktok.com/@${video.metadata.creator.unique_id}`}
                  target="_blank"
                >
                  (@{video.metadata.creator.unique_id})
                </a>
              </p>

              <div className="h-1 bg-gray-700 my-2" />

              <div className="break-words mb-4">
                {video.metadata.description !== null && (
                  <p className="pb-1 font-medium">
                    {video.metadata.description.caption}
                  </p>
                )}
                <div>
                  {video.metadata.description.tags.map((i) => {
                    return (
                      <a
                        href={`https://www.tiktok.com/tag/${i.replace(
                          '#',
                          ''
                        )}`}
                        key={i}
                        target="_blank"
                      >
                        <span className="text-white/50 hover:text-white/90 font-medium transition-colors duration-300">
                          {i}&nbsp;
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-row flex-1 justify-center gap-6">
                <Stat src="/eye.svg" value={video.metadata.statistics.views} />
                <Stat
                  src="/heart.svg"
                  value={video.metadata.statistics.likes}
                />
                <Stat
                  src="/comment.svg"
                  value={video.metadata.statistics.comments}
                />
                <Stat
                  src="/share.svg"
                  value={video.metadata.statistics.shares}
                />
              </div>
              <div className="flex items-center justify-center mt-4">
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
