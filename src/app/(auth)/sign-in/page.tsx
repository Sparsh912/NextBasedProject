'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"




const SignIn = () => {

    const router = useRouter();

    //zod implementation
    const form = useForm<z.infer<typeof signInSchema>>({           //form object containing register, handleSubmit, control, etc.
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    });
    // useForm() returns methods like handleSubmit, register, and control.
    // zodResolver ensures all inputs are validated with your Zod schema.
    // The signUpSchema defines type safety and form validation rules.



    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })

        if (result?.error) {
            toast.error("Login Failed", {
                description: "Incorrect username or password"
            })
            // if (result.error === 'CredentialsSignin') {
            //     toast.error('Login Failed',{
            //         description: 'Incorrect username or password'
            //     });
            // } else {
            //     toast.error('Error',{
            //         description: result.error
            //     });
            // }
        }

        if (result?.url) {
            router.replace('/dashboard')
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join True Feedback
                    </h1>
                    <p className="mb-4">Sign In to start your anonymous adventure</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email/Username</FormLabel>
                                    <Input {...field} placeholder="email/username" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...field} name="password" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className='w-full' >
                                Sign In
                        </Button>

                    </form>
                </Form>

                <div className="text-center mt-4">
                    <p>
                        New member?{' '}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn