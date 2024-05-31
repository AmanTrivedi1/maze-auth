"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

  
    return (
        
        <div>
        
        <div className="h-screen">
          <>
           <div className=" flex bg-base h-screen  items-center">
              <div className="md:block hidden max-w-2xl "> 
                  <div>
                     <img  src="/slideFive.png" className="h-screen object-cover"/>
                  </div>
             </div>
             <div className="max-w-3xl flex-col m-auto p-2   flex items-start justify-center">
                <h1 className="text-5xl font-semibold text-primary_dark">Own a piece of digital history with our unique NFT collectibles!</h1>
                <p className="text-white/60 mt-4 text-base">Welcome to our NFT marketplace, where innovation meets creativity.
                   Dive into a world where digital art comes to life, each piece a 
                   unique token of expression. Explore our curated collection and
                    embark on a journey of ownership in the digital realm. Join us
                     in redefining the future of art and collectibles through blockchain
                      technology.</p>
                 
                             <Link href="https://maze-nft.vercel.app/">
                                <button className="mt-8 bg-primary_dark hover:bg-primary_dark text-black bg-[#FFDF2B] px-4 py-2 rounded-lg">Explore More</button>
                             </Link>
                     
              </div>
            </div>
          </>
        </div>
            <div>
             <button
               onClick={logout}
               className=" absolute  bg-[#FFDF2B] text-black px-4 py-2 rounded-lg right-4 top-4">
               Logout
              </button>
            </div>
        </div>   
    )
}