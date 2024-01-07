import { Outlet, useOutletContext } from "react-router-dom";

import { Footer, Navbar } from "../components";
import { IsLogin } from "../App";

type ContextType = {
    isLogin: IsLogin
}

export default function Main({ isLogin }: { isLogin: IsLogin }) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Navbar isLogin={isLogin} />
            <div className="xl:w-[86%] md:w-[90%] sm:w-[94%] w-full h-full min-h-custom">
                <Outlet context={{ isLogin } satisfies ContextType} />
            </div>
            <Footer />
        </div>
    )
}

export function useIsLogin() {
    return useOutletContext<ContextType>();
}