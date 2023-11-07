"use client"

import { useEffect, useState } from "react"
import TikTokForm from "../components/TikTokForm"


export default function TikTok() {
    let [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <>
        <div className="w-screen h-screen bg-slate-900">
            <div className="flex flex-col items-center justify-center h-screen">
                {isLoading && (
                    <h1 className="text-white absolute transform -translate-y-24 text-3xl">Loading...</h1>
                )}
                <div className="pt-5">
                    <TikTokForm loadingSetter={setIsLoading}/>
                </div>
            </div>
        </div>
        </>
    )
}