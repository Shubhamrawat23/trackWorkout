import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useWktStore } from "@/store";
import supabase from "@/lib/supabaseClient";


export default function LogIn({ isOpen }) {
    const toggleBox = useWktStore((state) => state.toggleLoginBox);
    const toggleSignupBox = useWktStore((state) => state.toggleSignupBox);
    const setUserDetails = useWktStore((state)=>state.setUserDetails)
    let userSignUpData = useWktStore((state) => state.user_Data)

    const signUpClick = () => {
        toggleBox();
        toggleSignupBox();
    };

    
    const loginForm = async function (resp) {
        resp.preventDefault();
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: resp.target[0].value,
            password: resp.target[1].value,
        })
        
        if (!error) {
            // console.log(data);
            document.querySelector('.login_err').innerText = "";

            if (data?.session) {
                let token = data?.session?.access_token;
                let email_id = data?.user?.email;
                let phone = data?.user?.user_metadata?.phone_number;
                let country_code = data?.user?.user_metadata?.country_code;
                let user_name = data?.user?.user_metadata?.user_name;

                let gmt_created_date = new Date(data?.user?.created_at);

                let created_at = gmt_created_date.toLocaleDateString("en",{
                    month:'long',
                    year:'numeric',
                    day:'numeric'
                });
                

                setUserDetails({'token': token, 'email_id':email_id, 'phone_number':phone, 'country_code':country_code, 'user_name':user_name, 'created_date':created_at});

                toggleBox()
                
            }
            
        }else{
            console.log(error);            
            document.querySelector('.login_err').innerText = "Error in login";
            
        }
        
        
    }
    return (
        <>
            <Dialog open={isOpen} onOpenChange={toggleBox}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-semibold">
                            Welcome Back 👋
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-500">
                            Log in to continue your journey
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-4 mt-4" onSubmit={(e)=>loginForm(e)}>
                        <div>
                            <Label htmlFor="loginEmail" className="my-2">Email</Label>
                            <Input
                                className="border-2"
                                type="email"
                                id="loginEmail"
                                placeholder="you@example.com"
                                autoComplete="on"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="loginPass" className="my-2">Password</Label>
                            <Input
                                className="border-2"
                                type="password"
                                id="loginPass"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button className="w-full mb-0" type="submit">
                            Login
                        </Button>
                        <small className="text-red-700 login_err font-medium text-sm"></small>
                    </form>

                    <p className="text-sm text-center text-muted-foreground mt-3">
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            className="text-primary hover:underline font-medium cursor-pointer"
                            onClick={signUpClick}
                        >
                            Sign up
                        </button>
                    </p>
                </DialogContent>
            </Dialog>

        </>
    )
}