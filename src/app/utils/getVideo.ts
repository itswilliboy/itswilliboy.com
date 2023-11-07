"use server"

export default async function getVideo(url: string) {
    const res = await fetch(
        `${process.env.RAPID_TIKTOK_URL}?url=${url}`,
        {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
                "X-RapidAPI-Host": process.env.RAPID_TIKTOK_HOST!
            }
        }
    )
    return await res.json()
}