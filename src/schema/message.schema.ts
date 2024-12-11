import { z } from "zod";

export const sendMessageSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  message: z.string().min(1, "Message cannot be empty"),
});

export const sendMediaSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  media: z.string().url("Invalid URL format for media"),
  message: z.string().optional(),
});

