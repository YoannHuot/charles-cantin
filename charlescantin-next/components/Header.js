import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { strapiHost, nextHost } from "../../config";

const Header = ({ header, isMobile }) => {
	const router = useRouter();
	const url = header.logo.data.attributes.url;

	const [showMenu, setShowMenu] = useState(false);
	const [animate, setAnimate] = useState(false);

	const navigate = (url) => {
		const nav = url.toLowerCase();
		router.push("/" + nav);
	};

	const myLoader = ({ src, width, quality }) => {
		return `${strapiHost}${src}?w=500&q=${quality || 20}`;
	};

	return (
		<div className="relative z-20 flex flex-row items-center justify-center w-full h-40 overflow-visible md:justify-evenly bg-primary">
			<button
				className={`relative  ${isMobile && "w-2/3 xs:w-1/2 h-20"} md:w-1/4 lg:w-1/6 md:h-28 `}
				aria-label="go to home">
				<Image
					loader={myLoader}
					src={url}
					className={`logo object-cover h-auto`}
					onClick={() => {
						router.push("/");
					}}
					alt="logo charles cantin"
					objectFit="contain"
					layout="fill"
				/>
			</button>
			{!isMobile ? (
				<div className="flex flex-row justify-between px-2 md:w-1/2 lg:w-1/3 md:text-xl lg:text-xl xl:text-3xl text-light font-suraRegular ">
					<button
						className="pr-2 button"
						onClick={() => {
							navigate("/galerie");
						}}
						aria-label={`go to ${header.page1}`}>
						{header.page1}
					</button>
					<button
						className="pr-2 button"
						onClick={() => {
							navigate(header.page2);
						}}
						aria-label={`go to ${header.page2}`}>
						{header.page2}
					</button>
					<button
						className="pr-2 button"
						onClick={() => {
							navigate(header.page3);
						}}
						aria-label={`go to ${header.page3}`}>
						{header.page3}
					</button>
				</div>
			) : (
				<button
					className="flex justify-center w-20 mt-4 right-2"
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
						!showMenu ? "notShow w-0" : "show"
					} relative shadow-xl z-80 menuBurger h-96 bg-primary`}>
					<button
						className="flex items-center justify-center w-full mt-24"
						onClick={() => {
							setShowMenu(!showMenu), setAnimate(!animate);
						}}
						aria-label="close burger menu">
						<Image src="/assets/BackButton.svg" alt="burger menu" width="30" height="30" />
					</button>
					<div className="flex flex-col items-center px-6 mt-10 mr-1 text-xl xs:mr-0 text-light font-rosarioItalic ">
						<button
							className="w-24 pt-6"
							onClick={() => navigate("/galerie")}
							aria-label={`go to ${header.page1}`}>
							{header.page1}
						</button>
						<button
							className="w-24 pt-6"
							onClick={() => navigate(header.page2)}
							aria-label={`go to ${header.page2}`}>
							{header.page2}
						</button>
						<button
							className="w-24 pt-6"
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
