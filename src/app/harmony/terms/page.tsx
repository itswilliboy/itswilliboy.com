'use client'

export default function Terms(): JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900">
      <div className="m-4 h-4/5 w-1/4 rounded-lg bg-slate-800 text-center">
        <h1 className="my-10 text-3xl underline decoration-2 underline-offset-4">
          Harmony Terms of Service
        </h1>
        <ul className="flex h-72 list-decimal flex-col justify-evenly gap-5 px-8">
          <li>
            You may not use the application outside of its intended use, such as
            (but not limited to) exploiting unintended bugs found in the
            application.
          </li>
          <li>
            You may not intentionally abuse the application, such as (but not
            limited to) spamming commands.
          </li>
          <li>
            You may not use the application to aid in any illegal activites.
          </li>
        </ul>
      </div>
    </div>
  )
}
