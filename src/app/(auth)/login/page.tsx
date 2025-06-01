"use client";

import AuthUiWrapper from "@/components/shared/AuthUiWrapper";
import ErrorMessage from "@/components/shared/ErrorMessage";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema } from "@/schema/auth.schema";
import { login } from "@/services/actions/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginPage = () => {
  const { execute, result, isExecuting } = useAction(login);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthUiWrapper>
      <div className="flex flex-col items-center justify-center">
        <Card className="shadow-none border-0 w-sm md:w-[28rem]">
          <CardHeader className="flex flex-col items-center">
            <Logo transparent />
            <CardTitle className="text-2xl">Welcome back!</CardTitle>
            <CardDescription className="text-center">
              Turn spreadsheets into conversations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(execute)} className="space-y-6">
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
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </Card>
      </div>
    </AuthUiWrapper>
  );
};

export default LoginPage;
