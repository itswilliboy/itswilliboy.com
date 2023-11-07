"use client"

import { useState } from "react"
import TikTokForm from "../components/TikTokForm"


export default function TikTok() {
    let [url, setUrl] = useState<string | null>(null)
    let [loading, setLoading] = useState<boolean>(false)

    return (

        <>
        <div className="w-screen h-screen bg-slate-900">
            <div className="flex flex-col items-center">
                {loading && (
                    <h1 className="text-white h-96 text-5xl pt-[192px]">Loading...</h1>
                )}
                {url != null && (
                    <div className="pt-10">
                        <video src={url} controls className="w-96 rounded-lg" autoPlay onLoadStart={(e) => { e.currentTarget.volume = 0.5 }}></video>
                    </div>
                )}
                <div className="pt-5">
                    <TikTokForm urlSetter={setUrl} loadingSetter={setLoading}/>
                </div>
            </div>
        </div>
        </>
    )
}