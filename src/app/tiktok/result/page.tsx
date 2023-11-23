'use client'

import { useSearchParams } from 'next/navigation'

export default function Result (): JSX.Element {
  const url = useSearchParams().get('url')

  if (url == null) {
    return (
      <p className="flex w-screen h-screen items-center justify-center text-2xl bg-slate-900">
        Invalid URL provided.
      </p>
    )
  }

  return (
    <>
      <div className="bg-slate-900 w-screen h-screen">
        <a href="/tiktok">
          <p className="absolute top-4 left-4 bg-slate-800 p-3 rounded-3xl hover:bg-slate-700 hover:shadow-xl transition-all">
            &lt;- Go Back
          </p>
        </a>

        <div className="flex items-center justify-center h-screen">
          <video className="rounded-sm h-screen" controls autoPlay>
            <source src={url} type="video/mp4" />
            Your browser does not support videos.
          </video>
        </div>
      </div>
    </>
  )
}
