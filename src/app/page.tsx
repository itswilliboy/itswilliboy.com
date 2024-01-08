'use client'

import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

const getTime = (): { clock: string; date: string } => {
  const [clock, date] = new Date()
    .toLocaleString('en-GB', { hour12: false })
    .split(',')

  return {
    clock: clock!.trim(),
    date: date!.trim(),
  }
}

const HoverButton = ({
  title,
  src,
  href,
}: {
  title: string
  src: string
  href: string
}): JSX.Element => {
  return (
    <a
      href={href}
      title={title}
      className="opacity-50 transition-opacity hover:opacity-100"
      target="_blank"
    >
      <Image
        src={src}
        width={32}
        height={32}
        alt={src}
        className="w-6 transition-all duration-300 hover:w-8 md:w-8 md:hover:w-10"
      />
    </a>
  )
}

const items = [
  {
    title: 'View Source',
    src: './github.svg',
    href: 'https://github.com/itswilliboy/itswilliboy.com',
  },
  {
    title: 'TikTok Downloader',
    src: './tiktok.svg',
    href: '/tiktok',
  },
  {
    title: 'Profile',
    src: './user.svg',
    href: '/profile',
  },
]

const Home = (): JSX.Element => {
  const [time, setTime] = useState(getTime())

  useEffect(() => {
    setInterval(() => {
      setTime(getTime())
    }, 1000)
  }, [])

  return (
    <>
      <Image
        fill
        objectFit="cover"
        className="object-covert pointer-events-none -z-10 object-center"
        src="/sierra.jpg"
        alt="sierra"
      />

      <div className="ml-4 inline-flex h-16 w-32 items-center gap-3">
        {items.map((i) => {
          return HoverButton(i)
        })}
      </div>
      <div
        className="mt-20 flex justify-center text-center text-white md:mt-48"
        style={{ textShadow: '5px 5px black' }}
      >
        <h1 className="text-5xl font-bold md:text-6xl" suppressHydrationWarning>
          {time?.clock}
          <br />
          {time?.date}
        </h1>
      </div>
    </>
  )
}

export default dynamic(async () => await Promise.resolve(Home), {
  ssr: false,
})
