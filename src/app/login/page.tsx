"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div className="h-screen bg-[#232325]">
                <div className="flex bg-base h-screen items-center">
                    <div className="md:block hidden max-w-2xl">
                        <div>
                            <img src="/slideFive.png" className="h-screen object-cover" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full md:w-1/2 min-h-screen">
                        <div className="flex flex-col py-2 w-full max-w-md mx-auto">
                            <h1>{loading ? "Processing" : "Login"}</h1>
                            <hr className="my-4" />
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input
                                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                id="email"
                                type="text"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="email"
                            />
                            <label htmlFor="password" className="mb-2">Password</label>
                            <input
                                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="password"
                            />
                            <button
                                onClick={onLogin}
                                className="p-2  bg-[#FFDF2B]  text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                                disabled={buttonDisabled}
                            >
                                Login here
                            </button>
                            <Link href="/signup" className="text-blue-500 hover:underline">
                                Visit Signup page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
