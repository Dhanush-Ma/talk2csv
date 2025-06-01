"use client";

import AuthUiWrapper from "@/components/shared/AuthUiWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { signupSchema } from "@/schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { signup } from "@/services/actions/auth.actions";
import ErrorMessage from "@/components/shared/ErrorMessage";
import Logo from "@/components/shared/Logo";

const SignUpPage = () => {
  const { execute, result, isExecuting } = useAction(signup);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <AuthUiWrapper>
      <div className="flex flex-col items-center justify-center">
        <Card className="shadow-none border-0 w-sm md:w-[28rem]">
          <CardHeader className="flex flex-col items-center">
            <Logo transparent />
            <CardTitle className="text-2xl text-center">
              Let’s get you talking to your data
            </CardTitle>
            <CardDescription className="text-center">
              Turn spreadsheets into conversations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(execute)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@gmail.com" {...field} />
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
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {result.data?.status === "error" && (
                  <ErrorMessage message={result.data.message} />
                )}

                <Button
                  className="w-full"
                  type="submit"
                  disabled={isExecuting}
                  loading={isExecuting}
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </AuthUiWrapper>
  );
};

export default SignUpPage;
