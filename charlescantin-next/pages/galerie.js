import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import Image from "next/image";
import _ from "underscore";

const ColorPastille = ({ categorie, absolute }) => {
	switch (categorie.id) {
		case 1:
			return (
				<div
					className={`${
						absolute && "absolute top-1 -right-1 md:w-6 md:h-6 z-10"
					} w-3 h-3 mr-2 rounded-full md:text-xl bg-app-orange `}></div>
			);

		case 2:
			return (
				<div
					className={`${
						absolute && "absolute top-1 -right-1 z-10 md:w-6 md:h-6"
					} w-3 h-3 mr-2 rounded-full bg-app-yellow `}></div>
			);

		case 3:
			return (
				<div
					className={`${
						absolute && "absolute top-1 -right-1 md:w-6 md:h-6 z-10"
					} w-3 h-3 mr-2 rounded-full bg-app-pink `}></div>
			);

		case 7:
			return (
				<div
					className={`${
						absolute && "absolute top-1 -right-1 md:w-6 md:h-6 z-10"
					} w-3 h-3 mr-2 rounded-full bg-app-blue `}></div>
			);

		case 5:
			return (
				<div
					className={`${
						absolute && "absolute top-1 -right-1 md:w-6 md:h-6 z-10"
					} w-3 h-3 mr-2 rounded-full bg-app-purple `}></div>
			);

		case 6:
			return (
				<div
					className={`${
						absolute && "absolute top-1 -right-1 md:w-6 md:h-6 z-10"
					} w-3 h-3 mr-2 rounded-full bg-primary `}></div>
			);

		default:
			break;
	}
};

const Galerie = ({ categories, footer, header, informations }) => {
	const [isMobile, setIsMobile] = useState(false);
	const [selection, setSelection] = useState(categories);
	const [isEmpty, setIsEmpty] = useState(true);

	const handleResize = () => {
		if (window.innerWidth < 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	const handleSelection = (categorie) => {
		const index = selection.indexOf(categorie);
		if (index > -1) {
			setSelection(selection.filter((select) => categorie !== select));
		} else {
			setSelection([categorie, ...selection]);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", () => {
			handleResize();
		});
	}, []);

	useEffect(() => {
		if (selection.length === 0) {
			setIsEmpty(true);
		} else {
			setIsEmpty(false);
		}
	}, [selection]);

	return (
		<div className="relative flex flex-col justify-between h-screen overflow-x-hidden font-lato">
			<Header header={header} isMobile={isMobile} />
			<div className="z-10 flex flex-row flex-wrap justify-center w-full h-auto p-4 bg-light">
				{_.map(categories, (categorie) => {
					return (
						<button
							aria-label={"selecte " + categorie.attributes.title}
							className={`flex flex-row items-center w-28 xs:w-1/3 md:w-1/5  lg:w-48 min-w-28  md:1/2 px-4 py-2 m-2 mr-4  ${
								selection.indexOf(categorie) > -1 ? "bg-secondary text-light " : "bg-light"
							}`}
							onClick={() => {
								handleSelection(categorie);
							}}
							style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
							<ColorPastille categorie={categorie} />
							<div className="w-auto text-xs text-center lg:text-xl ">{categorie.attributes.title}</div>
						</button>
					);
				})}
			</div>
			<div
				className={
					isEmpty
						? "isEmpty flex justify-center items-center  bg-secondary h-2/3 lg:h-full py-8 md:py-16 px-8 relative"
						: "grid w-full h-auto grid-flow-row grid-cols-2 gap-8 px-8 pt-8 pb-8 bg-secondary md:grid-cols-3 relative "
				}>
				{isEmpty ? (
					<div className="z-10 flex items-center justify-center w-full h-80 md:h-80 lg:w-1/2 lg:h-96 bg-light ">
						<div className="flex items-center justify-center w-5/6 p-4 text-center border border-solid h-5/6">
							<p className="md:text-lg lg:text-2xl font-suraRegular">{informations}</p>
						</div>
					</div>
				) : (
					_.map(selection, (categorie) => {
						return (
							<>
								{selection.indexOf(categorie) > -1 &&
									_.map(categorie.attributes.media.data, (show, i) => {
										return (
											<div className="relative z-20 p-3 bg-light" alt={show.attributes.name}>
												<ColorPastille categorie={categorie} absolute={true} />
												<Image
													src={"http://localhost://:35601/" + show.attributes.url}
													width="70%"
													height="100%"
													layout="responsive"
													objectFit="cover"
													alt={show.attributes.name}
												/>
											</div>
										);
									})}
							</>
						);
					})
				)}
				<img className="absolute inset-0 z-0 w-full h-full" src="/assets/BackGroundEllipses.svg"></img>
			</div>
			<Footer footer={footer} />
		</div>
	);
};

export async function getServerSideProps() {
	const categorie = await axios.get("http://localhost://:35601/api/categories/?populate=*");
	const header = await axios.get("http://localhost://:35601/api/header/?populate=*");
	const footer = await axios.get("http://localhost://:35601/api/footer");
	const informations = await axios.get("http://localhost://:35601/api/no-categorie");

	return {
		props: {
			categories: categorie.data.data,
			footer: footer.data.data.attributes,
			header: header.data.data.attributes,
			informations: informations.data.data.attributes.noCategorie,
		}, // will be passed to the page component as props
	};
}

export default Galerie;
