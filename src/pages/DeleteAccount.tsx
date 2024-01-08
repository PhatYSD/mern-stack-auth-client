import { Link, useNavigate } from "react-router-dom";
import { useIsLogin } from "../layouts"
import { useState } from "react";
import { LoadingMini } from "../components";

interface Data {
    password?: string;
}

export default function DeleteAccount() {
    const { isLogin } = useIsLogin();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [data, setData] = useState<Data>({});

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handlerLogout = async () => {
        setLoading(true);

        try {
            const response = await fetch("https://mern-stack-auth-api.onrender.com/api/auth/deleteaccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": `${localStorage.getItem("access-token")}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const result = await response.json();
                alert(result.message)
            } else {
                alert("Delete is successfully.");
                localStorage.removeItem("access-token");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            navigate(0);
        }
    }

    return (
        <div className="w-full min-h-custom flex flex-col justify-center items-center">
            <h1 className="text-4xl font-light mb-4">Delete</h1>
            <div className="h-[15rem] w-[20rem] bg-sky-50 border-2 border-pink-500 rounded-lg flex flex-col justify-between items-center">
                {
                    loading ? <LoadingMini /> : (
                        <>
                            <div className="w-[94%]">
                            <h3 className="text-slate-700 mt-4">Do you want to delete, <span className="text-pink-500 font-semibold">{isLogin.username}</span>?</h3>
                            <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                                    <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                                        <div>Password</div>
                                        
                                    </label>
                                    <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="password" placeholder="password" name="password" id="password" value={data.password} onChange={handlerChange} />
                                </div>
                            </div>
                            <div className="flex w-full mb-4 items-center justify-around">
                                <Link to={"/"} className="w-[40%] h-8 border-2 bg-green-400 hover:bg-green-500 text-white font-medium border-green-500 rounded-lg flex justify-center items-center transition-colors cursor-pointer">Back</Link>
                                <div className="w-[40%] h-8 border-2 bg-red-400 hover:bg-red-500 text-white font-medium border-red-500 rounded-lg flex justify-center items-center transition-colors cursor-pointer" onClick={handlerLogout}>Delete</div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}