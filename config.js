const config = {
	hostname: "http://localhost",
	strapiPort: "35601",
	nextPort: "35600",
};

const strapiHost = `${config.hostname}:${config.strapiPort}`;
const nextHost = `${config.hostname}:${config.nextPort}`;

export default {
	...config,
	strapiHost,
	nextHost,
};
