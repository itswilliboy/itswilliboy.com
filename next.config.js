/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "discord.c99.nl",
            }
        ]
    }
}

module.exports = nextConfig
