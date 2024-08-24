import logoImg from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-gray-800 text-white px-2 md:px-6 lg:px-8 py-4 ">
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                <div
                    className="flex flex-col  items-center cursor-pointer"
                    onClick={() => navigate("/")}>
                    <img src={logoImg} alt="logo" className="w-14 md:w-16 h-14 md:h-16" />
                    <span className="text-md md:text-lg text-[#9495fa] font-semibold ">StoryNetwork</span>
                </div>
                <div>
                    <ul className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
                        <li className="hover:underline decoration-green-500 underline-offset-4 
                        cursor-pointer ">Privacy Policy</li>
                        <li className="hover:underline decoration-green-500 underline-offset-4 cursor-pointer">Terms & Conditions</li>
                        <li className="hover:underline decoration-green-500 underline-offset-4 cursor-pointer">Contact Us</li>
                        <li className="hover:underline decoration-green-500 underline-offset-4 cursor-pointer">About</li>
                    </ul>
                </div>
            </div>
            <div className="text-xs italic text-center mt-2">All rights reserverd @2024</div>
        </div>
    )
}

export default Footer;