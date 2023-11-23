'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Home (): JSX.Element {
  const [clock, setClock] = useState<string>()
  const [date, setDate] = useState<string>()

  const updateClock = async (): Promise<void> => {
    const [time, date] = new Date().toLocaleString('en-GB', { hour12: false }).split(',')
    setClock(time)
    setDate(date)
    await new Promise<void>((resolve) => {
      resolve()
    })
  }

  useEffect(() => {
    void updateClock().then(() => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setInterval(updateClock, 950)
    })
  }, [])

  return (
        <>
            <div>
                <Image
                fill
                className="object-center object-covert pointer-events-none -z-10"
                src="/sierra.jpg"
                alt=""
                />
                <div className="flex justify-center mt-52 text-center" style={{ textShadow: '5px 5px black' }}>
                    <h1 className="text-6xl font-bold">
                        {clock}<br />{date}
                    </h1>
                </div>
            </div>
        </>
  )
}
