"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { useUserContext } from "@/context/AuthContext";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { ADMIN_DASHBORD_ROUTE } from "@/router";
import { Loader } from 'lucide-react';
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(50),
});

export function Login() {
    const { login, setAuthenticated, authenticated } = useUserContext();
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const { isSubmitting } = form.formState;
    const navigate = useNavigate();

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (authenticated) {
            navigate(ADMIN_DASHBORD_ROUTE);
        }
    }, [authenticated, navigate]);

    const onSubmit = async values => {
        await login(values.email, values.password).then((response) => {
            if (response.status === 204) {
                setAuthenticated(true);
                navigate(ADMIN_DASHBORD_ROUTE);
            }
        }).catch(({ response }) => {
            console.log(response.data.errors);
            form.setError('email', {
                message: response.data.errors.email.join()
            });
        });
    };

    // Render login form only if the user is not authenticated
    if (authenticated) return null;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="********"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting ? <Loader className="mx-2 my-2 animate-spin" /> : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Login;
