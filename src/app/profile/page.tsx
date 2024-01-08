'use client'

import Image from 'next/image'

const socials = [
  {
    id: '0',
    text: 'GitHub',
    icon: '/github.svg',
    link: 'https://github.com/itswilliboy',
  },
  {
    id: '1',
    text: 'Steam',
    icon: '/steam.svg',
    link: 'https://steamcommunity.com/id/itswilliboy',
  },
]

function Item({
  text,
  icon,
  link,
  id,
}: {
  text: string
  icon: string
  link: string
  id: string
}): JSX.Element {
  return (
    <a href={link} target="_blank" key={id}>
      <div className="flex h-24 cursor-pointer items-center justify-center rounded-3xl border-0 bg-white/20 p-4 transition-colors hover:border-0 hover:bg-white/50 md:h-28">
        <Image
          src={icon}
          width={32}
          height={32}
          alt={`${text} logo`}
          className="w-10 md:w-14"
        />
        <h1 className="pl-2 text-2xl font-medium text-white md:pl-4 md:text-4xl">
          {text}
        </h1>
      </div>
    </a>
  )
}

export default function Profile(): JSX.Element {
  return (
    <div>
      <Image
        fill
        className="pointer-events-none -z-10 object-cover object-center"
        src="/sakura.jpg"
        alt=""
      />
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-[550px] w-[350px] justify-center rounded-2xl bg-white/20 p-3 backdrop-blur md:h-[650px] md:w-[500px] md:p-6">
          <div className="flex h-32 flex-row items-center">
            <Image
              src="/milo.jpg"
              width={128}
              height={128}
              alt="pfp"
              className="pointer-events-none w-24 rounded-full border-4 md:w-32"
            />
            <h1 className="ml-5 text-3xl font-medium md:text-6xl">
              ItsWilliboy
            </h1>
          </div>
          <div className="mb-6 mt-2 flex justify-center md:my-8">
            <hr className="w-4/5 rounded-lg border-2" />
          </div>
          <div className="flex flex-col gap-4">
            <a
              href="https://discord.com/users/263602820496883712"
              target="_blank"
            >
              <div className="flex h-24 cursor-pointer items-center justify-center rounded-3xl bg-white/20 transition-colors hover:bg-white/50 md:h-28">
                <Image
                  src="https://discord.c99.nl/widget/theme-4/263602820496883712.png"
                  width={1000}
                  height={1000}
                  alt="logo"
                />
              </div>
            </a>

            {socials.map((i) => {
              return Item(i)
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
