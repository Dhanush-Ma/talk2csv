"use client";

import { User } from "@supabase/supabase-js";
import AuthUiWrapper from "@/components/shared/AuthUiWrapper";
import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AppConfig } from "@/lib/config";
import { onboardingSchema } from "@/schema/onboarding.schema";
import { ONBOARDING } from "@/lib/constants";
import { createUser } from "@/services/actions/user.actions";

type OnboardingFormProps = {
  loggedInUser: User;
};

const OnboardingForm = ({ loggedInUser }: OnboardingFormProps) => {
  const { execute, result, isExecuting } = useAction(createUser);
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: loggedInUser.user_metadata.username,
      email: loggedInUser.email,
      company: "",
      role: "",
      acquisition: "",
    },
  });

  return (
    <AuthUiWrapper disableCopyright>
      <div className="flex flex-col items-center justify-center">
        <Card className="shadow-none border-0 w-sm md:w-[28rem]">
          <CardHeader className="flex flex-col items-center">
            <Logo />
            <CardTitle className="text-2xl text-center">
              Welcome to {AppConfig.name} — your AI-powered data assistant.
            </CardTitle>
            <CardDescription className="text-center">
              Before you begin, tell us a little about yourself — it helps us
              build a better product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((v) =>
                  execute({
                    id: loggedInUser.id,
                    ...v,
                  })
                )}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role that suits you" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[1000]">
                          {ONBOARDING.ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acquisition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How did you heard about {AppConfig.name}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[1000]">
                          {ONBOARDING.ACQUISITION_SOURCES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

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
                  Continue to dashboard
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AuthUiWrapper>
  );
};

export default OnboardingForm;
