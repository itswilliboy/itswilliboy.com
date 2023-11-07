"use client"

import { FormEvent } from "react";
import getVideo from "../utils/getVideo";
import { useRouter } from "next/navigation";

export default function TikTokForm({loadingSetter}: {loadingSetter: (value: boolean) => void}) {
    const router = useRouter()
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loadingSetter(true)

        const data = new FormData(e.currentTarget)
        const url = data.get("url")?.toString()

        getVideo(url!).then(
            (e) => {
                if (!e || !e.video) { return "Something went wrong." }
                loadingSetter(false)
                router.push(`/tiktok/result?url=${e.video[0]}`)
            }
        )
    }

    return (
        <>
            <form onSubmit={(e) => { onSubmit(e) }} className="flex flex-col gap-4 items-center">
                <input onClick={(e) => { e.currentTarget.select() }} type="text" name="url" placeholder="Enter a TikTok Video URL" className="p-2 rounded-lg outline-none bg-transparent w-[325px] md:w-[600px] text-center border-2 focus:border-violet-400 hover:border-violet-400 transition-colors" autoComplete="off"/>
                <input type="submit" value="Download" className="text-white p-2 cursor-pointer border-2 w-48 hover:border-y- rounded-lg hover:bg-violet-400/40 transition-colors" />
            </form>
        </>
    )
}