import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import { ForgetPassword, Home, Login, Logout, Notfound, Register, ResetPassword } from "./pages";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "login/",
                    element: <Login />
                },
                {
                    path: "logout/",
                    element: <Logout />
                },
                {
                    path: "register/",
                    element: <Register />
                },
                {
                    path: "resetpassword/",
                    element: <ResetPassword />
                },
                {
                    path: "forgetpassword/",
                    element: <ForgetPassword />
                }
            ]
        },
        {
            path: "*",
            element: <Notfound />
        }
    ]
);

ReactDOM.createRoot(document.getElementById("root")!)
    .render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );