'use client'

import { type FormEvent } from 'react'
import getVideo from '../utils/getVideo'
import { useRouter } from 'next/navigation'

export default function TikTokForm ({
  loadingSetter,
  errorSetter
}: {
  loadingSetter: (value: boolean) => void
  errorSetter: (value: string | null) => void
}): JSX.Element {
  const router = useRouter()

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const url = data.get('url')?.toString()
    if (url == null) {
      errorSetter('You need to enter a URL.')
      return
    }
    loadingSetter(true)

    getVideo(url)
      .then((video) => {
        if (video == null) {
          errorSetter('Something went wrong.')
          return
        }

        loadingSetter(false)
        router.push(`/tiktok/result?url=${video[0]}`)
      })
      .catch((err) => {
        loadingSetter(false)
        errorSetter(err.message)
      })
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 items-center">
        <input
          onClick={(e) => {
            e.currentTarget.select()
          }}
          onChange={() => {
            errorSetter(null)
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
    </>
  )
}
