import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

type Props = {
    title: string;
    subtitle?: string;
    color?: string;
    icon?: React.ReactNode;
}

const ServiceCard = ({ title, subtitle, color, icon }: Props) => {
    const iconColor = color && `bg-[${color}]`;

    return <div className="flex flex-row justify-start items-center p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${iconColor || ''}`}>{icon}</div>
        <div className="ml-5 flex flex-col flex-1">
            <h3 className="mt-2 text-white text-lg">
                {title}
            </h3>
            <p className="mt-2 text-white text-sm md:w-9/12">
                {subtitle}
            </p>
        </div>
    </div>
};

export const Services = () => {
    return (
        <div className="flex w-full flex-col md:flex-row justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 md:w-1/2 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient self-end">
                        Services that we <br />
                        continue to improve
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex-col justify-start items-center">
                <ServiceCard 
                    color="#2952E3" 
                    title="Security Guaranteed" 
                    icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
                    subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products."
                />
                <ServiceCard 
                    color="#8945F8" 
                    title="Best Exchange Rates" 
                    icon={<BiSearchAlt fontSize={21} className="text-white" />}
                    subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products."
                />
                <ServiceCard 
                    color="#F84550" 
                    title="Fastest Transactions" 
                    icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                    subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products."
                />
            </div>
        </div>
    )
}