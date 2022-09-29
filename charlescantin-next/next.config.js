/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ["localhost", " 192.168.1.63", "127.0.0.1"],
	},
};
