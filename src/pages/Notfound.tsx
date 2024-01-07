import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Notfound() {
    return (
        <div className="w-screen h-screen bg-sky-200 flex flex-col justify-center items-center">
            <h1 className="text-9xl font-semibold">404</h1>
            <h3 className="text-lg sm:text-3xl font-extralight mb-4">Oops, This Page Not Found!</h3>
            <Link to={"/"}>
                <div className="bg-black text-white w-40 h-10 rounded-lg border border-white outline outline-black cursor-pointer flex justify-center items-center gap-2">
                    <p>Back to Home</p>
                    <FaExternalLinkAlt />
                </div>
            </Link>
        </div>
    )
}