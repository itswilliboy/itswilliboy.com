'use client'

import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

const getTime = (): { clock: string, date: string } => {
  const [clock, date] = new Date()
    .toLocaleString('en-GB', { hour12: false })
    .split(',')

  return {
    clock: clock.trim(),
    date: date.trim()
  }
}

const HoverButton = ({
  title,
  src,
  href
}: {
  title: string
  src: string
  href: string
}): JSX.Element => {
  return (
    <a
      href={href}
      title={title}
      className="opacity-50 hover:opacity-100 transition-opacity"
      target="_blank"
    >
      <Image
        src={src}
        width={32}
        height={32}
        alt={src}
        className="w-8 hover:w-10 transition-all duration-300"
      />
    </a>
  )
}

const items = [
  {
    title: 'View Source',
    src: './github.svg',
    href: 'https://github.com/itswilliboy/itswilliboy.com'
  },
  {
    title: 'TikTok Downloader',
    src: './tiktok.svg',
    href: '/tiktok'
  },
  {
    title: 'Profile',
    src: './user.svg',
    href: '/profile'
  }
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
        className="object-center object-covert pointer-events-none -z-10"
        src="/sierra.jpg"
        alt="sierra"
      />

      <div className="inline-flex w-32 h-16 items-center ml-4 gap-3">
        {items.map((i) => {
          return HoverButton(i)
        })}
      </div>
      <div
        className="flex justify-center mt-52 text-center text-white"
        style={{ textShadow: '5px 5px black' }}
      >
        <h1 className="text-6xl font-bold" suppressHydrationWarning>
          {time?.clock}
          <br />
          {time?.date}
        </h1>
      </div>
    </>
  )
}

export default dynamic(async () => await Promise.resolve(Home), {
  ssr: false
})
