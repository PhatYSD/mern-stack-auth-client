import { Link, useNavigate } from "react-router-dom";
import { useIsLogin } from "../layouts"
import { useState } from "react";
import { Loading } from "../components";

export default function Logout() {
    const { isLogin } = useIsLogin();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlerLogout = () => {
        setLoading(true);

        localStorage.removeItem("access-token");

        setLoading(false);
        navigate(0);
    }

    return (
        <div className="w-full min-h-custom flex flex-col justify-center items-center">
            <h1 className="text-4xl font-light mb-4">Logout</h1>
            <div className="h-[10rem] w-[20rem] bg-sky-50 border-2 border-pink-500 rounded-lg flex flex-col justify-between items-center">
                <h3 className="text-slate-700 mt-4">Do you want to log out, <span className="text-pink-500 font-semibold">{ isLogin.username }</span>?</h3>
                <div className="flex w-full mb-4 items-center justify-around">
                    <Link to={"/"} className="w-[40%] h-8 border-2 bg-green-400 hover:bg-green-500 text-white font-medium border-green-500 rounded-lg flex justify-center items-center transition-colors cursor-pointer">Back</Link>
                    <div onClick={handlerLogout} className="w-[40%] h-8 border-2 bg-red-400 hover:bg-red-500 text-white font-medium border-red-500 rounded-lg flex justify-center items-center transition-colors cursor-pointer">Logout</div>
                </div>
            </div>
            {
                loading && <Loading />
            }
        </div>
    )
}