/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Set basePath to the repository name for GitHub Pages.
  // If your repository is named something else, please update this value.
  basePath: '/tools',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
