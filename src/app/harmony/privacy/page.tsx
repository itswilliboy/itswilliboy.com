'use client'

export default function Privacy(): JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900">
      <div className="m-4 h-4/5 w-1/4 rounded-lg bg-slate-800 text-center">
        <h1 className="mb-2 mt-10 text-3xl underline decoration-2 underline-offset-4">
          Harmony Privacy Policy
        </h1>
        <h2 className="mb-5 text-xl">Last Updated 24/4/2023</h2>
        <ul className="flex h-72 flex-col gap-5 px-4">
          <p className="text-lg font-semibold">
            What information do we (Harmony) store?
          </p>
          <li>
            Harmony currently only stores information about custom prefixes, the
            server ID and its prefix.
            <br />
            <br />
            This information is stored from the moment the bot joins a server,
            until it leaves or gets removed from the server. We do not collect
            any personal data on users, nor share the data that we collect.
          </li>
        </ul>
      </div>
    </div>
  )
}
