import React from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function LogIn() {
    return (
        <>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Welcome Gym Buddy Lets Go.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4 mb-3">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="Email">Email</Label>
                                <Input id="Email" placeholder="Your Email Buddy" />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="Password">Password</Label>
                                <Input id="Password" placeholder="Your Password Buddy" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button className="cursor-pointer">Start</Button>
                </CardFooter>
            </Card>
        </>
    )
}