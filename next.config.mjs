/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fphw0h5a4ihmh2dg.public.blob.vercel-storage.com"

            }
        ]
    }
};

export default nextConfig;
