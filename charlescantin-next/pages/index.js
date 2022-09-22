import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import "tailwindcss/tailwind.css";

import _ from "underscore";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ footer, header, uiHome, homeTitle }) {
	const path = "http://163.172.210.12:80988/";

	const imgBackground = path + uiHome.Background.data.attributes.url;
	const mainMedia = path + uiHome.charlesCantin.data.attributes.url;

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

	return (
		<div className="relative flex flex-col justify-between h-screen overflow-x-hidden">
			<Header header={header} isMobile={isMobile} />
			<div className="z-0 flex flex-1 w-full h-full ">
				<div className="relative flex flex-col w-full h-auto">
					<div className="absolute w-1/3 text-4xl leading-loose text-center transform -translate-y-1/2 -translate-x-2/3 xs:-translate-x-1/2 z-2 md:text-6xl lg:text-8xl top-1/2 left-1/2 text-light font-suraBold">
						{homeTitle}
					</div>
					<img
						src={mainMedia}
						alt="picture of charles cantin"
						className="object-cover w-full h-full z-2 mainMedia"
						style={
							isMobile
								? {
										transform: "scale(1.5)",
										transformOrigin: "0px 500px",
										height: "75vh",
								  }
								: {
										transform: "scale(1.5)",
										transformOrigin: "0px 600px",
										height: "90vh",
								  }
						}
					/>
				</div>

				<img
					aria-disabled="true"
					src={imgBackground}
					className="absolute z-1 top-20 opacity-70"
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
	const header = await axios.get("http://163.172.210.12:80987/api/header/?populate=*");
	const footer = await axios.get("http://163.172.210.12:80987/api/footer");
	const uiHome = await axios.get("http://163.172.210.12:80987/api/no-categorie/?populate=*");
	const homeTitle = await axios.get("http://163.172.210.12:80987/api/no-categorie");

	return {
		props: {
			footer: footer.data.data.attributes,
			header: header.data.data.attributes,
			uiHome: uiHome.data.data.attributes,
			homeTitle: homeTitle.data.data.attributes.homeTitle,
		}, // will be passed to the page component as props
	};
}
