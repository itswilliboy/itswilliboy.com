'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Home (): JSX.Element {
  const [time, setTime] = useState<{ clock: string, date: string }>()

  useEffect(() => {
    setInterval(() => {
      const [clock, date] = new Date()
        .toLocaleString('en-GB', { hour12: false })
        .split(',')
      setTime({ clock, date })
    }, 1000)
  }, [])

  return (
    <>
      <div>
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
          <h1 className="text-6xl font-bold">
            {time?.clock}
            <br />
            {time?.date}
          </h1>
        </div>
      </div>
    </>
  )
}
