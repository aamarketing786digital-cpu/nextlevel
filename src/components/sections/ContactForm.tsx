"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ContactFormData, contactFormSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_INTEREST_OPTIONS, BUDGET_RANGE_OPTIONS } from "@/lib/constants";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      serviceInterest: "web-dev",
      budgetRange: "5k-10k",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus("success");
        reset();
      } else {
        setFormStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  // Field animation variants
  const fieldVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {formStatus === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground">
            Thank you for reaching out. We'll be in touch within 24 hours.
          </p>
          <Button
            onClick={() => setFormStatus("idle")}
            variant="outline"
            className="mt-6 rounded-full"
          >
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            transition={{ delay: 0 * 0.1 }}
          >
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            transition={{ delay: 1 * 0.1 }}
          >
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Company Field */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            transition={{ delay: 2 * 0.1 }}
          >
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company
            </label>
            <Input
              id="company"
              placeholder="Your Company Ltd."
              {...register("company")}
            />
          </motion.div>

          {/* Service Interest Dropdown */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            transition={{ delay: 3 * 0.1 }}
          >
            <label htmlFor="serviceInterest" className="block text-sm font-medium mb-2">
              Service Interest <span className="text-destructive">*</span>
            </label>
            <Select
              onValueChange={(value) =>
                setValue("serviceInterest", value as any)
              }
              defaultValue="web-dev"
            >
              <SelectTrigger
                id="serviceInterest"
                className={errors.serviceInterest ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_INTEREST_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceInterest && (
              <p className="text-sm text-destructive mt-1">
                {errors.serviceInterest.message}
              </p>
            )}
          </motion.div>

          {/* Budget Range Dropdown */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            transition={{ delay: 4 * 0.1 }}
          >
            <label htmlFor="budgetRange" className="block text-sm font-medium mb-2">
              Budget Range <span className="text-destructive">*</span>
            </label>
            <Select
              onValueChange={(value) => setValue("budgetRange", value as any)}
              defaultValue="5k-10k"
            >
              <SelectTrigger
                id="budgetRange"
                className={errors.budgetRange ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select a budget range" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_RANGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budgetRange && (
              <p className="text-sm text-destructive mt-1">
                {errors.budgetRange.message}
              </p>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            transition={{ delay: 5 * 0.1 }}
          >
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              rows={6}
              placeholder="Tell us about your project..."
              {...register("message")}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </motion.div>

          {/* Error Message */}
          {formStatus === "error" && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Submission Failed</p>
                <p className="text-sm text-destructive/80">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            transition={{ delay: 6 * 0.1 }}
          >
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || formStatus === "submitting"}
              className="w-full sm:w-auto rounded-full"
            >
              {isSubmitting || formStatus === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
        </form>
      )}
    </div>
  );
}
