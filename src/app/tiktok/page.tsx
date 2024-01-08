'use client'

import { useState } from 'react'
import TikTokForm from '../components/TikTokForm'

import type { TikTokResponse } from '../api/tiktok/tiktok'
import Image from 'next/image'

const Stat = ({ src, value }: { src: string; value: number }): JSX.Element => {
  const formatted = Intl.NumberFormat('en', { notation: 'compact' }).format(
    value,
  )
  return (
    <div className="inline-flex items-center opacity-50">
      <Image src={src} alt={value.toString()} width={24} height={24} />
      <span className="pl-1 text-lg">{formatted}</span>
    </div>
  )
}

export default function TikTok(): JSX.Element {
  const [video, setVideo] = useState<TikTokResponse | null>(null)

  return (
    <div className="min-h-screen w-screen bg-slate-900">
      <div className="flex h-screen flex-col items-center pt-5">
        <TikTokForm videoSetter={setVideo} />

        {video !== null && (
          <div className="mt-5 flex w-screen flex-row justify-center pl-[350px]">
            <div className="flex flex-col">
              <video
                className="w-[350px] rounded-bl-lg rounded-tl-lg"
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
            <div className="w-[350px] rounded-br-lg rounded-tr-lg bg-slate-800 px-6 pt-3">
              <p className="flex flex-col text-2xl font-semibold">
                {video.metadata.creator.nickname}
                <a
                  className="text-base text-gray-400 transition-colors hover:text-gray-100"
                  href={`https://www.tiktok.com/@${video.metadata.creator.unique_id}`}
                  target="_blank"
                >
                  (@{video.metadata.creator.unique_id})
                </a>
              </p>

              <div className="my-2 h-1 bg-gray-700" />

              <div className="mb-4 break-words">
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
                          '',
                        )}`}
                        key={i}
                        target="_blank"
                      >
                        <span className="font-medium text-white/50 transition-colors duration-300 hover:text-white/90">
                          {i}&nbsp;
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-1 flex-row justify-center gap-6">
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
              <div className="mt-4 flex items-center justify-center">
                <a
                  href={URL.createObjectURL(video.video as Blob)}
                  download={`${video.metadata.aweme_id}.${
                    video.content_type.split('/')[1]
                  }`}
                  type={video.content_type}
                  className="w-72 rounded-lg bg-gray-700 p-3 text-center transition-colors duration-300 hover:bg-gray-600"
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
