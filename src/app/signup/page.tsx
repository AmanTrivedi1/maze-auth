"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div className="h-screen bg-[#232325]">
                <div className="flex h-screen items-center">
                    <div className="md:block hidden max-w-2xl w-1/2">
                        <div>
                            <img src="/slideFive.png" className="h-screen object-cover" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full md:w-1/2 min-h-screen">
                        <div className="flex flex-col py-2 w-full max-w-md mx-auto">
                            <h1 className="text-white mb-4">{loading ? "Processing" : "Signup"}</h1>
                            <hr className="my-4" />
                            <label htmlFor="username" className="text-white mb-2">Username</label>
                            <input
                                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                id="username"
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder="username"
                            />
                            <label htmlFor="email" className="text-white mb-2">Email</label>
                            <input
                                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                id="email"
                                type="text"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="email"
                            />
                            <label htmlFor="password" className="text-white mb-2">Password</label>
                            <input
                                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="password"
                            />
                            <button
                                onClick={onSignup}
                                className="p-2 bg-[#FFDF2B]  rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                                disabled={buttonDisabled}>
                                {buttonDisabled ? "No signup" : "Signup"}
                            </button>
                            <Link href="/login" className="text-blue-500 hover:underline">Visit login page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
