import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import _ from "underscore";
import PrestationCard from "../components/PrestationCard";

const Prestation = ({ prestations, footer, header }) => {
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
		if (typeof window !== "undefined") {
			window.addEventListener("resize", () => {
				handleResize();
			});
		}
	}, []);

	return (
		<div className="relative flex flex-col justify-between h-screen overflow-x-hidden">
			<Header header={header} isMobile={isMobile} />

			<div className="relative z-10 grid h-auto grid-flow-row grid-cols-2 gap-8 px-8 pt-8 pb-8 md:grid-cols-3 md:gap-14 lg:gap-24 sm:gap-10 md:px-10 lg:px-28 lg:pt-28 lg:pb-28 bg-secondary">
				<img className="absolute z-10 w-full h-full inset-10" src="/assets/BackGroundEllipses.svg"></img>
				{!_.isUndefined(prestations) &&
					prestations.map((prestation, key) => {
						return <PrestationCard prestation={prestation} key={prestation.id} isMobile={isMobile} />;
					})}
			</div>

			<Footer footer={footer} />
		</div>
	);
};

export async function getServerSideProps() {
	const prestations = await axios.get("http://163.172.210.12:80988/api/prestations/?populate=*");
	const header = await axios.get("http://163.172.210.12:80988/api/header/?populate=*");
	const footer = await axios.get("http://163.172.210.12:80988/api/footer");

	const getPrestations = prestations.data.data.map((prestation, key) => {
		return prestation.attributes;
	});
	return {
		props: {
			prestations: getPrestations,
			footer: footer.data.data.attributes,
			header: header.data.data.attributes,
		}, // will be passed to the page component as props
	};
}

export default Prestation;
