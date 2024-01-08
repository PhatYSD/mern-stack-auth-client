import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingMini } from "../components";

interface Data {
    username?: string;
    password?: string;
}

export default function Login() {
    const [data, setData] = useState<Data>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ));
    }

    const handlerLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://mern-stack-auth-api.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const result = await response.json();
                alert(result.message);
                return;
            }

            const result = await response.json();
            localStorage.setItem("access-token", result.token);
            setData({});
            navigate(0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-custom h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-light mb-4">Login</h1>
            <div className="h-[20rem] w-[20rem] bg-sky-50 border-2 border-pink-500 rounded-lg flex flex-col justify-between items-center">
                {
                    loading ? <LoadingMini /> : (
                        <>
                            <div className="w-full flex flex-col justify-center items-center">
                                <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                                    <label className="text-xs w-[94%] flex justify-between items-center">
                                        <div className="font-bold">Username</div>
                                        <div>Need an accound?
                                            <Link to={"/register"} className="font-semibold ms-2 text-pink-500">Register</Link>
                                        </div>
                                    </label>
                                    <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="text" placeholder="username" name="username" id="username" onChange={handlerChange} value={data.username} />
                                </div>
                                <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                                    <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                                        <div>Password</div>
                                    </label>
                                    <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="password" placeholder="password" name="password" id="password" onChange={handlerChange} value={data.password} />
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center">
                                <div className="w-full flex justify-center items-center">
                                    <button className="w-[94%] py-1 bg-green-400 hover:bg-green-600 rounded-full border-2 border-green-600 text-white font-bold transition-colors" type="button" onClick={handlerLogin}>Login</button>
                                </div>
                                <div className="mt-2 mb-4">
                                    <Link to={"/forgetpassword"} className="text-sm">Forget password?</Link>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}