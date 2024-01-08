import { useState } from "react";
import { LoadingMini } from "../components";
import { useNavigate } from "react-router-dom";

interface Data {
    password?: string;
    repassword?: string;
}

export default function ResetPassword() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [data, setData] = useState<Data>({});

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handlerReset = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/auth/resetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": `${localStorage.getItem("access-token")}`
                },
                body: JSON.stringify({
                    oldPassword : data.password,
                    newPassword: data.repassword
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
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-custom h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-light mb-4">Reset Password</h1>
            <div className="h-[15rem] w-[20rem] bg-sky-50 border-2 border-pink-500 rounded-lg flex flex-col justify-between items-center">
                {
                    loading ? <LoadingMini /> : (
                        <>
                            <div className="w-full flex flex-col justify-center items-center">
                                <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                                    <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                                        <div>Password</div>

                                    </label>
                                    <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="password" placeholder="password" name="password" id="password" value={data.password} onChange={handlerChange} />
                                </div>
                                <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                                    <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                                        <div>New Password</div>

                                    </label>
                                    <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="password" placeholder="repassword" name="repassword" id="repassword" value={data.repassword} onChange={handlerChange} />
                                </div>
                            </div>
                            <div className="w-full mb-4 flex flex-col justify-center items-center">
                                <div className="w-full flex justify-center items-center">
                                    <button className="w-[94%] py-1 bg-green-400 hover:bg-green-600 rounded-full border-2 border-green-600 text-white font-bold transition-colors" type="button" onClick={handlerReset}>Reset Password</button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}