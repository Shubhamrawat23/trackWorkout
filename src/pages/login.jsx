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


export default function LogIn({isOpen}) {
    const toggleBox = useWktStore((state) => state.toggleLoginBox);
    const toggleSignupBox = useWktStore((state) => state.toggleSignupBox)
    
    const signUpClick = () => {
        toggleBox();
        toggleSignupBox();
    };
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

                    <form className="space-y-4 mt-4">
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

                        <Button className="w-full" type="submit">
                            Login
                        </Button>
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