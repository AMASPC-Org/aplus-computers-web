import { z } from 'zod';

export const ContactSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20, 'Phone cannot exceed 20 characters').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message cannot exceed 2000 characters'),
});

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.string().optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
