import React, { useEffect, useState } from "react";

import Image from "next/image";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { strapiHost, nextHost } from "../../config";

const PrestationCard = ({ prestation, id, isMobile }) => {
	const [open, setOpen] = useState(false);
	const [isPair, setIsPair] = useState();
	const cardMedia = prestation.media.data[0].attributes.url;

	const handleTitle = () => {
		if (id % 2 == 0) setIsPair(true);
		else {
			setIsPair(false);
		}
	};

	useEffect(() => {
		handleTitle();
	}, []);

	const myLoader = ({ src, width, quality }) => {
		return `${strapiHost}${src}?w=500&q=${quality || 20}`;
	};

	return (
		<>
			<div
				className="relative z-30 w-full h-full bg-light"
				style={{
					boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
				}}>
				<div
					className={` ${
						isPair ? "-top-3" : " -bottom-4"
					} border border-1 border-opacity-10 border-secondary absolute z-10 flex text-xs items-center justify-center w-24 xs:w-32 lg:w-48 md:w-40 xl:w-56 xl:h-20 xl:text-3xl md:h-14 md:text-xl h-10 text-center transform xs:text-base -translate-x-1/2  bg-light left-1/2`}
					style={{
						boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;",
					}}>
					<p className="w-full font-rosarioBoldItalic "> {prestation.title}</p>
				</div>
				<div className="object-cover w-full p-4 h-5/5">
					<Image
						loader={myLoader}
						src={cardMedia}
						width="70%"
						height="100%"
						layout="responsive"
						objectFit="cover"
					/>
				</div>

				<button
					className={`button absolute w-12 h-12 xl:w-20 xl:h-20 ${
						isPair ? "-bottom-2 left-0 xl:-bottom-4 xl:-left-1" : "top-1 right-0 xl:top-2 xl:-right-3"
					} overflow-visible `}
					onClick={() => {
						setOpen(true);
					}}>
					<Image src="/assets/More.svg" alt="me" width="90" height="90" />
				</button>

				{isMobile ? (
					<BottomSheet open={open} className="z-40 w-full overflow-scroll h-2/4 " height={"50vh"}>
						<div className="z-40 flex flex-col w-full h-full">
							<Image
								loader={myLoader}
								src={cardMedia}
								width="70%"
								height="80%"
								layout="responsive"
								objectFit="cover"
							/>

							<button
								className="absolute top-0 right-0 w-10 h-10 m-4 button "
								onClick={() => {
									setOpen(false);
								}}>
								<Image src="/assets/BackButtonCircle.svg" alt="me" width="40" height="40" />
							</button>
							<div className="flex flex-col items-center mt-10 mb-10">
								<div className="text-2xl font-rosarioBoldItalic text-light"> {prestation.title} </div>
								<div className="px-8 pt-4 text-xl text-center font-rosario text-light">
									{prestation.price}
								</div>
								<div className="px-8 pt-4 text-lg text-center font-rosario text-light">
									{prestation.description}
								</div>
							</div>
						</div>
					</BottomSheet>
				) : (
					<>
						{open && (
							<div className="absolute inset-0 w-full h-full bg-primary">
								<button
									className={` absolute ${isMobile ? "w-8 h-8" : "w-12 h-12"}  xl:w-20 xl:h-20 ${
										isPair
											? "bottom-2 left-2 xl:-bottom-2 xl:-left-1"
											: "top-1 right-2 xl:top-0 xl:-right-3"
									} overflow-visible `}
									onClick={() => {
										setOpen(false);
									}}>
									<Image
										src="/assets/BackButtonCircle2.svg"
										alt="back"
										width={`${isMobile ? "45" : "56"}`}
										height={`${isMobile ? "45" : "56"}`}
									/>
								</button>
								<div className="z-40 flex flex-col w-full h-full">
									<div className="flex flex-col items-center mt-10 mb-10">
										<div className="px-8 pt-4 text-xl text-center xl:pt-14 xl:text-3xl font-rosario text-light">
											{prestation.price}
										</div>
										<div className="px-4 pt-4 text-base text-center xl:pt-8 xl:text-xl feont-rosario text-light">
											{prestation.description}
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default PrestationCard;
