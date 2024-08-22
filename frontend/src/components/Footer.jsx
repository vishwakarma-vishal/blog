import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-full bg-gray-800 text-white px-8 py-4 ">
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                <div className="text-3xl">
                    <Link to="/">Logo</Link>
                </div>
                <div>
                    <ul className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Contact Us</li>
                        <li>About</li>
                    </ul>
                </div>
            </div>
            <div className="text-xs text-center mt-4">All rights reserverd @2024</div>
        </div>
    )
}

export default Footer;