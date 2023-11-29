'use client'

import { useState, type FormEvent } from 'react'
import { type TikTokResponse } from '../api/tiktok/tiktok'
import Spinner from './Spinner'

interface TikTokFormParam {
  videoSetter: (value: TikTokResponse | null) => void
}

export default function TikTokForm ({
  videoSetter
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
        errorMessage: 'You need to enter a URL.'
      })
      return
    }

    setPageState({
      isLoading: true,
      errorMessage: null
    })

    const req = await fetch(`/api/tiktok?q=${encodeURIComponent(url)}`)
    if (!req.ok) {
      const resp = await req.json()

      setPageState({
        isLoading: false,
        errorMessage: resp.message
      })
      return
    }

    videoSetter(null)

    const resp = await req.arrayBuffer()
    const metadata = JSON.parse(
      decodeURIComponent(req.headers.get('x-video-metadata') ?? '')
    )

    videoSetter({
      video: new Blob([resp]),
      content_type: req.headers.get('content-type') ?? 'video/mp4',
      metadata
    })

    setPageState({
      isLoading: false,
      errorMessage: null
    })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={onSubmit} className="flex flex-col gap-4 items-center">
      <input
        onClick={(e) => {
          e.currentTarget.select()
        }}
        onChange={(e) => {
          e.currentTarget.value = e.currentTarget.value.split('?')[0]
        }}
        disabled={pageState.isLoading}
        type="text"
        name="url"
        placeholder="Enter a TikTok Video URL"
        className="p-2 rounded-lg outline-none bg-transparent w-[325px] md:w-[600px] text-center border-2 focus:border-violet-400 hover:border-violet-400 transition-colors disabled:opacity-70 disabled:cursor-wait"
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={pageState.isLoading}
        className="p-2 w-full md:w-4/12 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:cursor-wait"
      >
        {/* eslint-disable-next-line multiline-ternary */}
        {!pageState.isLoading ? (
          <p>Download</p>
        ) : (
          <div className="flex justify-center items-center">
            <Spinner />
            <p>Downloading...</p>
          </div>
        )}
      </button>

      {pageState.errorMessage !== null && (
        <p className="text-red-500 text-md">{pageState.errorMessage}</p>
      )}
    </form>
  )
}
