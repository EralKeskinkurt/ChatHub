import { z } from "zod";
export const registerSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number can't be longer than 15 digits"),
        birthDate: z.string().refine(
            (val) => {
                const date = new Date(val);
                return !isNaN(date.getTime());
            },
            { message: "Invalid date" }
        ),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })