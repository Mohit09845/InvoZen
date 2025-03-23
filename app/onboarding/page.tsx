"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from '@conform-to/react'
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchema";

export default function Onboarding() {
    // useActionState is a React Hook that helps track the state of a server action used for form.
    // In this case, it calls onboardUser (a server action) when the form is submitted
    // It stores the last result from the server (lastResult).
    const [lastResult, action] = useActionState(onboardUser, undefined);
    // useForm hook has client side state and lastResult has server side state so we will sync both of them
    // so useForm provides instant feedback to users without needing a full server request.
    const [] = useForm({
        lastResult,

        onValidate({formData}) {   
            // converting formData into js object
            return parseWithZod(formData, {
                schema: onboardingSchema
            })
        },

        shouldValidate: 'onBlur',  // Validation runs when the user leaves (blurs) an input field
        shouldRevalidate: 'onInput'  // Validation runs on every keystroke (when the user types or modifies input).
    })
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input placeholder="Mohit" />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input placeholder="Sharma" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Address</Label>
              <Input placeholder="Gulab Ganj Colony" />
            </div>
            <SubmitButton text="Finish Onboarding" />  
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


// There are 2 ways to send Data in Nextjs, either use Server Actions like we did in login page(it was inline server action) action..... or use route handler
