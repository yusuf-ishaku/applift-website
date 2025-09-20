"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { makeNewEnquiry } from "@/actions/blog";
import { inquiryBudget, inquiryHelpWith } from "@/constants";
import { inquirySchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type InquiryFormValues = z.infer<typeof inquirySchema>;

const ButtonGroup = ({
  options,
  value,
  onChange,
}: {
  options: Readonly<string[]>;
  value: string[];
  onChange: (vals: string[]) => void;
}) => {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {options.map((option) => (
        <Button
          key={option}
          variant={value.includes(option) ? "default" : "outline"}
          onClick={() => toggle(option)}
          type="button"
          className={clsx(
            "rounded-lg border border-[#012D51] text-sm sm:text-[16px] text-[#4F4F4F] dark:text-[#CFCFCF] px-3 py-2",
            !value.includes(option) && "!bg-transparent",
          )}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

const toastId = "help-form-toast";
export default function InquiryForm({ className }: { className?: string }) {
  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      helpWith: [],
      budget: "" as InquiryFormValues["budget"],
      name: "",
      email: "",
      overview: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: makeNewEnquiry,
    onMutate: () => {
      toast.loading("Sending your inquiry…", { id: toastId });
    },
    onSuccess: () => {
      toast.success("All set! We’ll get back to you soon.", { id: toastId });
    },
    onError: (error) => {
      console.error("Error submitting inquiry", error);
      toast.error("Oops! Something went wrong. Please try again.", {
        id: toastId,
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => mutate(values))}>
        <fieldset
          disabled={isPending}
          className={clsx(
            "bg-[linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-[594px] p-4 sm:p-6 lg:p-8 mx-auto",
            className,
          )}
        >
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
              {/* Help With */}
              <FormField
                control={form.control}
                name="helpWith"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col items-start gap-4">
                      <FormLabel className="text-base sm:text-[18px] leading-relaxed text-[#FAFAFA]">
                        I&apos;m looking for help with:
                      </FormLabel>
                      <FormControl>
                        <ButtonGroup
                          options={inquiryHelpWith}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Budget */}
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col items-start gap-4">
                      <FormLabel className="text-base sm:text-[18px] leading-relaxed text-[#FAFAFA]">
                        I&apos;m budgeting around:
                      </FormLabel>
                      <FormControl>
                        <ButtonGroup
                          options={inquiryBudget}
                          value={[field.value]}
                          onChange={(vals) =>
                            field.onChange(vals[vals.length - 1])
                          }
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                <h5 className="text-base sm:text-[18px] text-[#060606] dark:text-[#FAFAFA]">
                  Contact Us:
                </h5>
                <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Name"
                            {...field}
                            className="!bg-transparent rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email"
                            className="!bg-transparent rounded-lg mt-2 sm:mt-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Overview */}
              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Project Overview"
                        className="w-full !bg-transparent mt-2 appearance-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="mt-4 w-full sm:w-auto h-11 sm:h-[44px] rounded-lg"
            >
              Send Message
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
