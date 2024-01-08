import { useState } from "react";
import { LoadingMini } from "../components";
import { useNavigate } from "react-router-dom";

interface Data {
    username?: string;
    password?: string;
    repassword?: string;
}

export default function ForgetPassword() {
    const [next, setNext] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data>({});
    const navigate = useNavigate();

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handlerNext = async () => {
        setLoading(true);

        try {
            const response = await fetch("https://mern-stack-auth-api.onrender.com/api/auth/forgetpassword/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: data.username
                })
            });

            if (!response.ok) {
                const result = await response.json();
                setLoading(false);
                alert(result.message);
            }

            const result = await response.json();
            localStorage.setItem("access-userid", result.userId);
            setNext(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handlerReset = async () => {
        if (data.password !== data.repassword) {
            alert("Password not match.");
            return;
        }
        setLoading(true);

        try {
            const response = await fetch("https://mern-stack-auth-api.onrender.com/api/auth/forgetpassword/change", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-userid": `${localStorage.getItem("access-userid")}`
                },
                body: JSON.stringify({
                    password: data.password
                })
            });

            if (!response.ok) {
                const result = await response.json();
                alert(result.message);
                return;
            }

            const result = await response.json();
            alert(result.message);
            setData({});
            localStorage.removeItem("access-userid");
            navigate("/login");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-custom h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-light mb-4">Forget Password</h1>
            <div className={`h-[${next ? "20rem" : "10rem"}] w-[20rem] bg-sky-50 border-2 border-pink-500 rounded-lg flex flex-col justify-between items-center transition-all`}>
                {
                    loading ? <LoadingMini /> : (
                        <>
                            <div className="w-full flex flex-col justify-start items-center">
                                <div className="w-full mt-2 flex flex-col justify-center items-center gap-1">
                                    <label className="text-xs w-[94%] text-start font-bold">Username</label>
                                    <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="text" placeholder="username" name="username" id="username" value={data.username} onChange={handlerChange} />
                                </div>
                                {
                                    next && (
                                        <>
                                            <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                                                <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                                                    <div>Password</div>

                                                </label>
                                                <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="password" placeholder="password" name="password" id="password" value={data.password} onChange={handlerChange} />
                                            </div>
                                            <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                                                <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                                                    <div>Re Password</div>

                                                </label>
                                                <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="password" placeholder="repassword" name="repassword" id="repassword" value={data.repassword} onChange={handlerChange} />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="w-full flex flex-col justify-center items-center">
                                <div className="w-full flex justify-center items-center">
                                    <button className="w-[94%] mb-4 py-1 bg-green-400 hover:bg-green-600 rounded-full border-2 border-green-600 text-white font-bold transition-colors" type="button" onClick={next ? handlerReset : handlerNext}>
                                        {next ? "Reset password" : "Next"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}