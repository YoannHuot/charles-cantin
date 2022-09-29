import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { strapiHost } from "../../config";

import "tailwindcss/tailwind.css";

import _ from "underscore";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ footer, header, uiHome, homeTitle }) {
	const imgBackground = uiHome.Background.data.attributes.url;
	const mainMedia = uiHome.charlesCantin.data.attributes.url;

	console.log(strapiHost + mainMedia);
	const [isMobile, setIsMobile] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", () => {
			handleResize();
		});
	}, []);
	const myLoader = ({ src, width, quality }) => {
		return `${strapiHost}${src}?w=500&q=${quality || 20}`;
	};

	return (
		<div className="relative flex flex-col justify-between h-screen overflow-x-hidden">
			<Header header={header} isMobile={isMobile} />

			<div className="relative z-0 flex flex-col w-full image-container">
				<div className="absolute w-1/3 text-4xl leading-loose text-center transform -translate-y-1/2 -translate-x-2/3 xs:-translate-x-1/2 z-2 md:text-6xl lg:text-8xl top-1/2 left-1/2 text-light font-suraBold">
					{homeTitle}
				</div>
				<Image
					loader={myLoader}
					src={mainMedia}
					alt="picture of charles cantin"
					className="object-cover w-full h-full z-2 mainMedia"
					objectFit="cover"
					layout="fill"
					style={
						isMobile
							? {
									transform: "scale(1.5)",
									transformOrigin: "0px 200px",
							  }
							: {
									transform: "scale(1.5)",
									transformOrigin: "0px 400px",
							  }
					}
				/>

				<Image
					loader={myLoader}
					aria-disabled="true"
					src={imgBackground}
					className="absolute z-1 top-20 opacity-70"
					objectFit="cover"
					layout="fill"
					style={{
						height: "50vh",
					}}
				/>
			</div>
			<Footer footer={footer} />
		</div>
	);
}

export async function getServerSideProps() {
	const header = await axios.get(`${strapiHost}/api/header/?populate=*`);
	const footer = await axios.get(`${strapiHost}/api/footer`);
	const uiHome = await axios.get(`${strapiHost}/api/no-categorie/?populate=*`);
	const homeTitle = await axios.get(`${strapiHost}/api/no-categorie`);

	return {
		props: {
			footer: footer.data.data.attributes,
			header: header.data.data.attributes,
			uiHome: uiHome.data.data.attributes,
			homeTitle: homeTitle.data.data.attributes.homeTitle,
		}, // will be passed to the page component as props
	};
}
