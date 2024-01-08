import { Link } from "react-router-dom";
import { useIsLogin } from "../layouts";

export default function Home() {
    const { isLogin } = useIsLogin();

    return (
        <div className="w-full min-h-custom h-full flex flex-col justify-center items-center">
            <div className="h-[25rem] w-[20rem] bg-sky-50 border-2 border-pink-500 rounded-lg flex flex-col justify-between items-center">
                <div className="w-[94%] mt-2">
                    <h1 className="text-xl text-center text-wrap">Welcome, <span className="text-pink-500 font-semibold">{isLogin.username}</span>.</h1>
                </div>
                <div className="w-full mb-4 flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex justify-center items-center">
                        <Link to={"/resetpassword"} className="w-[94%] py-1 bg-yellow-400 hover:bg-yellow-600 rounded-full text-center border-2 border-yellow-600 text-white font-bold transition-colors cursor-pointer" type="button">Reset Password</Link>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <Link to={"/deleteAccount"} className="w-[94%] py-1 bg-red-400 hover:bg-red-600 rounded-full border-2 text-center border-red-600 text-white font-bold transition-colors cursor-pointer" type="button">Delete Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}