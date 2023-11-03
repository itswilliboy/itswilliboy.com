"use client"

import Image from "next/image"
import { useEffect, useState } from "react";

function Item({text, icon, link, id}: {text: string, icon: string, link: string, id: string}) {
    return (
        <a href={link} target="_blank" key={id}>
            <div className="h-24 md:h-28 border-0 hover:border-0 rounded-3xl p-4 flex items-center justify-center cursor-pointer hover:bg-white/50 bg-white/30 transition-colors">
                <Image src={icon} width={32} height={32} alt={`${text} logo`} className="w-10 md:w-14"/>
                <h1 className="text-2xl md:text-4xl pl-2 md:pl-4 font-medium">{text}</h1>
            </div>
        </a>
    )
}

const socials = [
    {id: "0", text: "GitHub", icon: "/github.svg", link: "https://github.com/itswilliboy"},
    {id: "1", text: "Steam", icon: "/steam.svg", link: "https://steamcommunity.com/id/itswilliboy"}
]

export default function Profile() {
    return (
        <>
            <div>
                <Image
                fill
                className="object-center object-cover pointer-events-none -z-10"
                src="/sakura.jpg"
                alt=""
                />
                <div className="flex w-screen h-screen items-center justify-center">
                    <div className="w-[350px] md:w-[500px] h-[550px] md:h-[650px] bg-white/20 rounded-2xl justify-center p-3 md:p-6 backdrop-blur">
                        <div className="flex flex-row h-32 items-center">
                            <Image src="/milo.jpg" width={128} height={128} alt="pfp" className="rounded-full border-4 pointer-events-none w-24 md:w-32"/>
                            <h1 className="text-3xl md:text-6xl ml-5 font-medium">ItsWilliboy</h1>
                        </div>
                        <div className="flex justify-center mt-2 mb-6 md:my-8"><hr className="w-4/5 border-2 rounded-lg"/></div>
                        <div className="flex flex-col gap-4">

                        <a href="https://discord.com/users/263602820496883712">
                            <div className="h-24 md:h-28 rounded-3xl flex items-center justify-center cursor-pointer bg-white/30 hover:bg-white/50 transition-colors">
                                <Image src="https://discord.c99.nl/widget/theme-4/263602820496883712.png" width={1000} height={1000} alt="logo"/>
                            </div>

                        </a>
                            {
                                socials.map((i) => { return Item(i)})
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}