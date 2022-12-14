import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import Image from "next/image";
import { strapiHost } from "../../config";

const Contact = ({ footer, header, background }) => {
	const [isMobile, setIsMobile] = useState(false);
	console.log(background);
	const imgBackground = background.Background.data.attributes.url;
	const handleResize = () => {
		if (window.innerWidth < 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		handleResize();
		if (typeof window !== "undefined") {
			window.addEventListener("resize", () => {
				handleResize();
			});
		}
	}, []);

	const myLoader = ({ src, width, quality }) => {
		return `${strapiHost}${src}?w=500&q=${quality || 20}`;
	};

	return (
		<div className="flex flex-col justify-between h-full overflow-x-hidden">
			<Header header={header} isMobile={isMobile} />
			<div className="relative flex flex-col justify-center w-full h-full contact bg-secondary">
				{isMobile && (
					<Image
						src="/assets/BackGroundAppareil.svg"
						alt="burger menu"
						layout="responsive"
						width="1000"
						height="1000"
						className="relative"
					/>
				)}
				<form
					name="contact"
					method="post"
					data-netlify="true"
					onSubmit="submit"
					className="absolute z-0 flex flex-col items-center justify-center w-auto h-auto p-6 pb-24 text-center transform -translate-x-1/2 -translate-y-1/2 lg:w-1/3 lg:toprounded-lg top-1/2 left-1/2 md:text-2xl lg:text-4xl bg-primary "
					style={{
						boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
					}}>
					<input type="hidden" name="form-name" value="contact" />
					<div className="mt-4 text-sm font-bold uppercase xl:text-2xl sm:text-base lg:text-lg font-latoBold w-60 lg:w-96">
						<label>
							<input
								type="text"
								name="name"
								className="border border-solid w-60 lg:w-96 border-app-primary"
								style={{ backgroundColor: "#FFFFFF" }}
								placeholder="Entrez votre nom "
							/>
						</label>
					</div>
					<div className="mt-4 text-sm font-bold uppercase xl:text-2xl sm:text-base lg:text-lg font-latoBold w-60 lg:w-96">
						<label>
							<input
								type="email"
								name="email"
								className="border border-solid w-60 lg:w-96 border-app-primary"
								style={{ backgroundColor: "#FFFFFF" }}
								placeholder="Entrez votre email"
							/>
						</label>
					</div>
					<div className="mt-4 mb-8 text-sm font-bold uppercase xl:text-2xl sm:text-base lg:text-lg font-latoBold w-60 lg:w-96">
						<label className="w-full ">
							<textarea
								name="message"
								className="w-full border border-solid border-app-primary "
								placeholder="Quelque chose ?? ajouter ? "
								style={{ backgroundColor: "#FFFFFF" }}></textarea>
						</label>
					</div>

					<button type="submit" className="w-40 p-2 mt-8 text-white rounded-lg bg-app-pink ">
						Envoyer
					</button>
				</form>
			</div>
			<Footer footer={footer} />
		</div>
	);
};

export async function getServerSideProps() {
	const header = await axios.get(`${strapiHost}/api/header/?populate=*`);
	const footer = await axios.get(`${strapiHost}/api/footer`);
	const background = await axios.get(`${strapiHost}/api/no-categorie/?populate=*`);

	return {
		props: {
			footer: footer.data.data.attributes,
			header: header.data.data.attributes,
			background: background.data.data.attributes,
		}, // will be passed to the page component as props
	};
}

export default Contact;
