import React from "react";
import Link from "next/link";

const DashboardCard = ({ title, quantity, hrefLink }) => {
    return (
        <Link href={hrefLink} className="bg-gray-200 w-full h-[50vh] flex flex-col justify-center items-center hover:bg-gray-300">
            <article>
                <h1 className="text-2xl font-bold">{title}</h1>
                <h2 className="text-lg font-semibold">{quantity} items</h2>
                <p className="text-sm">View {title}</p>
            </article>
        </Link>
    );
};

export default DashboardCard;
