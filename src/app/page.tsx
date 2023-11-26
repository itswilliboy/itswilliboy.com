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

      <div
        className="flex justify-center mt-52 text-center"
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
