'use client'

import { useState, type FormEvent } from 'react'
import { type TikTokResponse } from '../api/tiktok/tiktok'
import Spinner from './Spinner'

interface TikTokFormParam {
  videoSetter: (value: TikTokResponse | null) => void
}

export default function TikTokForm({
  videoSetter,
}: TikTokFormParam): JSX.Element {
  const [pageState, setPageState] = useState<{
    isLoading: boolean
    errorMessage: string | null
  }>({ isLoading: false, errorMessage: null })

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const url = data.get('url')?.toString()

    if (url == null || url === '') {
      setPageState({
        isLoading: false,
        errorMessage: 'You need to enter a URL.',
      })
      return
    }

    setPageState({
      isLoading: true,
      errorMessage: null,
    })

    const req = await fetch(`/api/tiktok?q=${encodeURIComponent(url)}`)
    if (!req.ok) {
      const resp = await req.json()

      setPageState({
        isLoading: false,
        errorMessage: resp.message,
      })
      return
    }

    videoSetter(null)

    const resp = await req.arrayBuffer()
    const metadata = JSON.parse(
      decodeURIComponent(req.headers.get('x-video-metadata') ?? ''),
    )

    videoSetter({
      video: new Blob([resp]),
      content_type: req.headers.get('content-type') ?? 'video/mp4',
      metadata,
    })

    setPageState({
      isLoading: false,
      errorMessage: null,
    })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
      <input
        onClick={(e) => {
          e.currentTarget.select()
        }}
        onChange={(e) => {
          e.currentTarget.value = e.currentTarget.value.split('?')[0] ?? ""
        }}
        disabled={pageState.isLoading}
        type="text"
        name="url"
        placeholder="Enter a TikTok Video URL"
        className="w-[325px] rounded-lg border-2 bg-transparent p-2 text-center outline-none transition-colors hover:border-violet-400 focus:border-violet-400 disabled:cursor-wait disabled:opacity-70 md:w-[600px]"
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={pageState.isLoading}
        className="w-full rounded-lg bg-slate-700 p-2 transition-colors hover:bg-slate-600 disabled:cursor-wait md:w-4/12"
      >
        {/* eslint-disable-next-line multiline-ternary */}
        {!pageState.isLoading ? (
          <p>Download</p>
        ) : (
          <div className="flex items-center justify-center">
            <Spinner />
            <p>Downloading...</p>
          </div>
        )}
      </button>

      {pageState.errorMessage !== null && (
        <p className="text-md text-red-500">{pageState.errorMessage}</p>
      )}
    </form>
  )
}
