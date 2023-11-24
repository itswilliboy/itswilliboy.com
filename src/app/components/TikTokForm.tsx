'use client'

import { type FormEvent } from 'react'
import { type TikTokResponse } from '../api/tiktok/tiktok'

interface FormParam {
  pageStateSetter: (value: {
    isLoading: boolean
    errorMessage: string | null
  }) => void
  videoSetter: (value: TikTokResponse | null) => void
}

export default function TikTokForm ({
  pageStateSetter,
  videoSetter
}: FormParam): JSX.Element {
  //

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const url = data.get('url')?.toString()

    if (url == null || url === '') {
      pageStateSetter({
        isLoading: false,
        errorMessage: 'You need to enter a URL.'
      }); return
    }

    pageStateSetter({
      isLoading: true,
      errorMessage: null
    })

    const req = await fetch(`/api/tiktok?q=${encodeURIComponent(url)}`)
    if (!req.ok) {
      const resp = await req.json()

      pageStateSetter({
        isLoading: false,
        errorMessage: resp.message
      })
    }

    const resp = await req.arrayBuffer()
    const metadata = JSON.parse(req.headers.get('x-video-metadata') ?? '') ?? {}

    videoSetter({
      video: new Blob([resp]),
      content_type: req.headers.get('content-type') ?? 'video/mp4',
      metadata
    })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={onSubmit} className="flex flex-col gap-4 items-center">
      <input
        onClick={(e) => {
          e.currentTarget.select()
        }}
        type="text"
        name="url"
        placeholder="Enter a TikTok Video URL"
        className="p-2 rounded-lg outline-none bg-transparent w-[325px] md:w-[600px] text-center border-2 focus:border-violet-400 hover:border-violet-400 transition-colors"
        autoComplete="off"
      />

      <input
        type="submit"
        value="Download"
        className="text-white p-2 cursor-pointer border-2 w-48 hover:border-y- rounded-lg hover:bg-violet-400/40 transition-colors"
      />
    </form>
  )
}
