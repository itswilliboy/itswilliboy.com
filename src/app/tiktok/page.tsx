'use client'

import { useState } from 'react'
import TikTokForm from '../components/TikTokForm'

export default function TikTok (): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  return (
        <>
        <div className="w-screen h-screen bg-slate-900">
            <div className="flex flex-col items-center justify-center h-screen">
                {isLoading && (
                    <h1 className="text-white absolute transform -translate-y-24 text-3xl">Loading...</h1>
                )}
                {(error != null) && (
                    <p className="text-red-500 absolute transform -translate-y-16 text-md">{error}</p>
                )}
                <div className="pt-5">
                    <TikTokForm loadingSetter={setIsLoading} errorSetter={setError}/>
                </div>
            </div>
        </div>
        </>
  )
}
