import React from "react";
import Link from "next/link";

const DashboardCard = ({ title, quantity, hrefLink }) => {
    return (
        <Link href={hrefLink} className="bg-gray-700/50 w-full h-[50vh] flex flex-col justify-center items-center hover:bg-gray-700/40">
            <article>
                <h1 className="text-2xl font-bold">{title}</h1>
                <h2 className="text-lg font-semibold">{quantity} items</h2>
                <p className="text-sm">View {title}</p>
            </article>
        </Link>
    );
};

export default DashboardCard;
