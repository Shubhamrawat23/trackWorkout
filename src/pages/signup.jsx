import { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogFooter,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useWktStore } from "@/store";
import supabase from "@/lib/supabaseClient";

export default function MultiStepSignup() {

    let userSignUpData = useWktStore((state) => state.user_Data)
    let setUserSignupDetails = useWktStore((state) => state.setUserDetails)
    let isSignupBoxShow = useWktStore((state)=>state.isSignupBoxShow)
    let toggleSignupBox = useWktStore((state) => state.toggleSignupBox);

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({
        user_name: '',
        dob: '',
        email_id: '',
        password: '',
        country_code: '',
        phone_number: '',
        created_date: '',
        state: '',
        country: '',
    });

    const handleChange = (field, value) => {
        // console.log("----- valu",field,value);

        setUserSignupDetails({[field]: value});
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    //validations
    function input_validations(field, value) {
        console.log(field, value);

        let isValidationApproved = false
        let reasonOfValidation = "";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
        const countryCodeRegex = /^\+\d{1,4}$/;
        const phoneRegex = /^\d{10}$/;

        switch (field) {

            case 'email_id':
                if (!value) {
                    reasonOfValidation = "Email can't be empty";
                } else if (!emailRegex.test(value)) {
                    reasonOfValidation = "Email should be in format user@example.com";
                } else {
                    isValidationApproved = true;
                }
                break;

            case 'country_code':
                if (!value) {
                    reasonOfValidation = "Country code can't be empty";
                } else if (!countryCodeRegex.test(value)) {
                    reasonOfValidation = "Country code must be like +91 or +1";
                } else {
                    isValidationApproved = true;
                }
                break;

            case 'phone_number':
                if (!value) {
                    reasonOfValidation = "Phone number can't be empty";
                } else if (!phoneRegex.test(value)) {
                    reasonOfValidation = "Phone number must be 10 digits";
                } else {
                    isValidationApproved = true;
                }
                break;

            case 'password':
                if (!value) {
                    reasonOfValidation = "Password can't be empty";
                } else if (value.length < 6) {
                    reasonOfValidation = "Password must be at least 6 characters";
                } else {
                    isValidationApproved = true;
                }
                break;
            case "user_name":
                if (!value) {
                    reasonOfValidation = "Full name can't be empty";
                } else if (value.length < 3) {
                    reasonOfValidation = "Enter a valid full name";
                } else {
                    isValidationApproved = true;
                }
                break;

            case "dob":
                if (!value) {
                    reasonOfValidation = "Date of birth is required";
                } else {
                    isValidationApproved = true;
                }
                break;

            case "state":
                if (!value) {
                    reasonOfValidation = "State is required";
                } else {
                    isValidationApproved = true;
                }
                break;

            case "country":
                if (!value) {
                    reasonOfValidation = "Country is required";
                } else {
                    isValidationApproved = true;
                }
                break;


            default:
                reasonOfValidation = "Invalid field";
        }
        return { isValidationApproved, reasonOfValidation };
    }

    function validateStep1() {
        const fields = ["email_id", "password", "country_code", "phone_number"];
        let newErrors = {};
        let hasError = false;

        fields.forEach((field) => {
            const { isValidationApproved, reasonOfValidation } = input_validations(field, userSignUpData[field]);

            if (!isValidationApproved) {
                newErrors[field] = reasonOfValidation;
                hasError = true;
            }
        });

        setErrors((prev) => ({ ...prev, ...newErrors }));

        return hasError;
    };
    function validateStep2() {
        const fields = ["user_name", "dob", "state", "country"];
        let newErrors = {};
        let hasError = false;

        fields.forEach((field) => {
            const { isValidationApproved, reasonOfValidation } =
                input_validations(field, userSignUpData[field]);

            if (!isValidationApproved) {
                newErrors[field] = reasonOfValidation;
                hasError = true;
            }
        });

        setErrors((prev) => ({ ...prev, ...newErrors }));
        return hasError;
    }


    // submit form for signup
    const submitSignup = async function () {
        // console.log(userSignUpData);

        const { data, error } = await supabase.auth.signUp({
            email: userSignUpData?.email_id,
            password: userSignUpData?.password,
            options:{
                data:{
                    user_name:userSignUpData?.user_name,
                    phone_number:userSignUpData?.phone_number,
                    country_code:userSignUpData?.country_code,
                }
            }
        })

        if (!error) {
            console.log("data");
            
            if (data?.session) {
                let token = data?.session?.access_token

                setUserSignupDetails({['token']: token})
                toggleSignupBox();
            }
        }
        // console.log(userSignUpData);
        
    }

    // const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const nextStep = () => {
        if (step === 1 && validateStep1()) return;
        if (step === 2 && validateStep2()) return;

        setStep(prev => Math.min(prev + 1, 3));
    };
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <Dialog open={isSignupBoxShow} onOpenChange={toggleSignupBox} className="w-full max-w-lg shadow-lg">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold">
                        {step === 1 && "Account Info"}
                        {step === 2 && "Profile and Location Info"}
                        {step === 3 && "Review & Submit"}
                    </DialogTitle>
                    <div className="mt-3">
                        <Progress value={(step / 4) * 100} className="h-2 rounded-full" />
                        <p className="text-xs text-muted-foreground mt-1 text-center">Step {step} of 3</p>
                    </div>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Step 1 */}
                    {step === 1 && (
                        <>
                            <div id="signup_email_box">
                                <Label className="my-2">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={userSignUpData?.email_id}
                                    onChange={e => handleChange("email_id", e.target.value)}
                                />
                                <small className="text-red-700">{errors.email_id}</small>
                            </div>
                            <div id="signup_pass_box" className="relative">
                                <Label className="my-2">Password</Label>
                                {/* Eye-off (hide) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute right-2 ${errors.password ? 'bottom-8' : 'bottom-2'}`} width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                                    <path d="M2.5 12s3.5-7.5 9.5-7.5S21.5 12 21.5 12s-3.5 7.5-9.5 7.5S2.5 12 2.5 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                    <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" />
                                </svg>

                                {/* Eye (show) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-2 bottom-2 hidden" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                                    <path d="M2.5 12s3.5-7.5 9.5-7.5S21.5 12 21.5 12s-3.5 7.5-9.5 7.5S2.5 12 2.5 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    value={userSignUpData?.password}
                                    onChange={e => handleChange("password", e.target.value)}
                                />
                                <small className="text-red-700">{errors.password}</small>


                            </div>
                            <div id="mobile_num">
                                <Label className="my-2">Phone Number</Label>
                                <div className="flex gap-2">
                                    <Select
                                        value={userSignUpData?.country_code}
                                        onValueChange={e => handleChange("country_code", e)}
                                    >
                                        <SelectTrigger className="w-auto">
                                            <SelectValue placeholder="+xx" />
                                        </SelectTrigger>
                                        <SelectContent className="w-auto">
                                            <SelectItem value="+91">+91</SelectItem>
                                            <SelectItem value="+1">+1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        placeholder="xxxxxxxxxx"
                                        maxLength={10}
                                        value={userSignUpData?.phone_number}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, "");
                                            handleChange("phone_number", digitsOnly);
                                        }}
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />

                                </div>
                                <small className="text-red-700">{errors.country_code || errors.phone_number}</small>


                            </div>
                        </>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <>
                            <div id="user_name">
                                <Label className="my-2">Full Name</Label>
                                <Input
                                    placeholder="Jane Doe"
                                    value={userSignUpData?.user_name}
                                    onChange={e => handleChange("user_name", e.target.value)}
                                />
                                <small className="text-red-700">{errors.user_name}</small>
                            </div>
                            {/* <div>
                                <Label className="my-2">Username</Label>
                                <Input
                                    placeholder="janedoe"
                                    value={userSignUpData?.username}
                                    onChange={e => handleChange("username", e.target.value)}
                                />
                            </div> */}
                            <div id="dob">
                                <Label className="my-2">Date of Birth</Label>
                                <Input
                                    type="date"
                                    value={userSignUpData?.dob}
                                    onChange={e => handleChange("dob", e.target.value)}
                                />
                                <small className="text-red-700">{errors.dob}</small>
                            </div>
                            <div id="country">
                                <Label className="my-2">Country</Label>
                                <Select
                                    value={userSignUpData?.country}
                                    onValueChange={value => handleChange("country", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="india">India</SelectItem>
                                        <SelectItem value="usa">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <small className="text-red-700">{errors.country}</small>
                            </div>
                            <div id="state">
                                <Label className="my-2">State</Label>
                                <Input
                                    placeholder="Haryana"
                                    value={userSignUpData?.state}
                                    onChange={e => handleChange("state", e.target.value)}
                                />
                                <small className="text-red-700">{errors.state}</small>
                            </div>
                        </>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span>Email:</span><span>{userSignUpData?.email_id}</span></div>
                            {/* <div className="flex justify-between"><span>Username:</span><span>{userSignUpData?.username}</span></div> */}
                            <div className="flex justify-between"><span>Full Name:</span><span>{userSignUpData?.user_name}</span></div>
                            <div className="flex justify-between"><span>DOB:</span><span>{userSignUpData?.dob}</span></div>
                            <div className="flex justify-between"><span>Location:</span><span>{userSignUpData?.state}, {userSignUpData?.country}</span></div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    {/* Navigation Buttons */}
                    <div className="w-full flex justify-between mt-6">
                        <Button className="cursor-pointer" variant="outline" disabled={step === 1} onClick={prevStep}>
                            Back
                        </Button>
                        <Button className="cursor-pointer" onClick={step === 3 ? submitSignup : nextStep}>
                            {step === 3 ? "Submit" : "Next"}
                        </Button>
                    </div>
                </DialogFooter>


            </DialogContent>
        </Dialog>
    );
}