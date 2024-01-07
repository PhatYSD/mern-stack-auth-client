import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";

export default function Register() {
    return (
        <div className="w-full min-h-custom h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-light mb-4">Register</h1>
            <div className="h-[20rem] w-[20rem] bg-sky-50 border-2 border-pink-500 rounded-lg flex flex-col justify-between items-center">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                        <label className="text-xs w-[94%] flex justify-between items-center">
                            <div className="font-bold">Username</div>
                            <div>Already have an account?
                                <Link to={"/register"} className="font-semibold ms-2 text-pink-500">Log in</Link>
                            </div>
                        </label>
                        <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="text" placeholder="username" name="username" id="username" />
                    </div>
                    <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                        <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                            <div>Password</div>
                            <div className="flex justify-end items-center cursor-pointer">
                                <div>Show</div>
                                <BiShow className="text-lg ms-1" />
                            </div>
                        </label>
                        <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="password" placeholder="password" name="password" id="password" />
                    </div>
                    <div className="w-full mt-2 flex flex-col justify-start items-center gap-1">
                        <label className="text-xs font-bold w-[94%] flex justify-between items-center">
                            <div>Re Password</div>
                            <div className="flex justify-end items-center cursor-pointer">
                                <div>Show</div>
                                <BiShow className="text-lg ms-1" />
                            </div>
                        </label>
                        <input className="w-[94%] text-lg text-center py-1 rounded-full border-2 border-pink-500 focus:border-red-400 outline-none transition-colors" type="repassword" placeholder="repassword" name="repassword" id="repassword" />
                    </div>
                </div>
                <div className="w-full mb-4 flex flex-col justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                        <button className="w-[94%] py-1 bg-green-400 hover:bg-green-600 rounded-full border-2 border-green-600 text-white font-bold transition-colors" type="button">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );    
}