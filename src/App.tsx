import { useEffect, useState } from "react";

import { Main } from "./layouts";
import { Loading } from "./components";
import { useLocation, useNavigate } from "react-router-dom";

export interface IsLogin {
    login?: boolean;
    username?: string;
}

export default function App() {
    const [isLogin, setIsLogin] = useState<IsLogin>({ login: false });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        async function fetchData(): Promise<void> {
            const token = localStorage.getItem("access-token");

            if (token) {
                const response = await fetch("/api/auth/", {
                    headers: {
                        "access-token": `${token ? token : ""}`
                    }
                });

                if (!response.ok) {
                    localStorage.removeItem("access-token");
                    setIsLogin({ login: false });
                    return;
                }

                const data = await response.json();

                setIsLogin((prev) => ({
                    ...prev,
                    login: data.success,
                    username: data.username
                }));
            }
        }

        fetchData()
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (isLogin.login && ["/register", "/login", "/forgetpassword"].includes(location.pathname)) {
            navigate("/");
        }
        if (!isLogin.login && ["/logout", "/", "/deleteAccount"].includes(location.pathname) && "/register" !== location.pathname) {
            navigate("/login");
        }
    }, [isLogin.login, location.pathname]);

    return (
        <div>
            <Main isLogin={isLogin} />
            {
                loading && <Loading />
            }
        </div>
    );
}