import React from "react";

const Footer = ({ footer }) => {
	return (
		<div className="relative z-40 flex flex-row justify-center w-full h-full pb-10 bg-light xl:py-10">
			<div className="flex flex-col px-10 text-sm xl:text-2xl sm:text-base lg:text-lg md:flex-row ">
				<ul className="flex flex-col justify-center mt-5 md:mr-10">
					<li className="pt-2 font-bold lg:pt-4">{footer.name}</li>
					<li className="pt-2 lg:pt-4 sm:ml-4">{footer.job}</li>
					<li className="pt-2 lg:pt-4 sm:ml-4">{footer.opening}</li>
				</ul>
				<ul className="flex flex-col justify-center mt-5 md:ml-10 ">
					<li className="pt-2 font-bold lg:pt-4">{footer.contact}</li>
					<li className="pt-2 lg:pt-4 sm:ml-4">{footer.email}</li>
					<li className="pt-2 lg:pt-4 sm:ml-4">{footer.phone}</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
