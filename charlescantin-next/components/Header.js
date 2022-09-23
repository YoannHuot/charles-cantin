import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { strapiHost, nextHost } from "../../config";

const Header = ({ header, isMobile }) => {
	const router = useRouter();
	const url = header.logo.data.attributes.url;
	const path = { nextHost } + "/" + url;

	const [showMenu, setShowMenu] = useState(false);
	const [animate, setAnimate] = useState(false);

	const navigate = (url) => {
		const nav = url.toLowerCase();

		router.push("/" + nav);
	};

	return (
		<div className="relative z-20 flex flex-row items-center justify-center w-full h-40 overflow-visible bg-primary">
			<button className={`${isMobile && "w-1/2 xs:w-2/6"} w-1/2 md:h-full `} aria-label="go to home">
				<img
					src={path}
					className={`logo object-cover h-full`}
					onClick={() => {
						router.push("/");
					}}
					alt="logo charles cantin"
				/>
			</button>
			{!isMobile ? (
				<div className="flex flex-row justify-between w-1/2 px-16 lg:w-1/3 md:text-xl lg:text-xl xl:text-3xl text-light font-suraRegular ">
					<button
						className="button"
						onClick={() => {
							navigate(header.page1);
						}}
						aria-label={`go to ${header.page1}`}>
						{header.page1}
					</button>
					<button
						className="button"
						onClick={() => {
							navigate(header.page2);
						}}
						aria-label={`go to ${header.page2}`}>
						{header.page2}
					</button>
					<button
						className="button"
						onClick={() => {
							navigate(header.page3);
						}}
						aria-label={`go to ${header.page3}`}>
						{header.page3}
					</button>
				</div>
			) : (
				<button
					className="absolute flex justify-center w-20 mt-4 right-2"
					onClick={() => {
						setShowMenu(!showMenu);
						setAnimate(!animate);
					}}
					aria-label={`open menu`}>
					{!showMenu && <Image src="/assets/Menu.svg" alt="burger menu" width="40" height="40" />}
				</button>
			)}

			{isMobile && (
				<div
					className={` ${
						!showMenu ? "notShow " : "show "
					}  relative shadow-xl z-80 menuBurger h-96 bg-primary`}>
					<button
						className="flex items-center justify-center w-full mt-24"
						onClick={() => {
							setShowMenu(!showMenu), setAnimate(!animate);
						}}
						aria-label="close burger menu">
						<Image src="/assets/BackButton.svg" alt="burger menu" width="30" height="30" />
					</button>
					<div className="flex flex-col items-center px-16 mt-10 mr-1 text-xl xs:mr-0 text-light font-rosarioItalic ">
						<button
							className="w-16 pt-6"
							onClick={() => navigate(header.page1)}
							aria-label={`go to ${header.page1}`}>
							{header.page1}
						</button>
						<button
							className="w-16 pt-6"
							onClick={() => navigate(header.page2)}
							aria-label={`go to ${header.page2}`}>
							{header.page2}
						</button>
						<button
							className="w-16 pt-6"
							onClick={() => navigate(header.page3)}
							aria-label={`go to ${header.page3}`}>
							{header.page3}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
