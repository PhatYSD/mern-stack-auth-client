import { SiAuth0 } from "react-icons/si";
import { Link } from "react-router-dom";

import { IsLogin } from "../App";

export default function Navbar({ isLogin }: { isLogin: IsLogin }) {
    return (
        <nav className="w-full h-20 bg-sky-400 overflow-hidden">
            <div className="xl:w-[86%] md:w-[90%] sm:w-[94%] w-full h-full mx-auto flex justify-between items-center">
                <div className="w-1/2">
                    <Link to={"/"} className="xl:text-4xl md:text-2xl sm:text-xl sm:block hidden text-pink-500 font-semibold">MERN Auth Client</Link>
                    <Link to={"/"} className="block sm:hidden" >
                        <SiAuth0 className="text-4xl ms-2 text-pink-500" />
                    </Link>
                </div>
                {
                    isLogin.login ? (
                        <div className="w-1/2 h-full flex justify-end items-center">
                            <Link to={"/logout"} className="text-base sm:text-lg text-red-500 hover:text-white bg-gray-300 hover:bg-red-500 font-semibold h-full sm:h-12 w-20 sm:w-24 border-2 border-red-500 sm:rounded-lg flex justify-center items-center transition-all cursor-pointer">Logout</Link>
                        </div>
                    ) : (
                        <div className="w-1/2 h-full flex justify-end items-center gap-0 sm:gap-2">
                            <Link to={"/login"} className="text-base sm:text-lg text-pink-500 hover:text-pink-600 font-semibold h-full sm:h-12 w-20 sm:w-24 border-2 border-pink-500 hover:border-pink-600 sm:rounded-lg flex justify-center items-center hover:shadow-sm hover:shadow-pink-600 transition-all cursor-pointer">Login</Link>
                            <Link to={"/register"} className="text-base sm:text-lg text-white hover:text-pink-500 font-semibold h-full sm:h-12 w-20 sm:w-24 bg-pink-500 hover:bg-inherit sm:rounded-lg border-pink-500 hover:border-2 flex justify-center items-center transition-all cursor-pointer">Register</Link>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}