// ClientProviders.js
"use client";

import { SessionProvider } from "next-auth/react";
import { AppProvider } from "../context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientProviders({ children, session }) {
    return (
        <SessionProvider session={session}>
            <AppProvider>
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {children}
            </AppProvider>
        </SessionProvider>
    );
}
