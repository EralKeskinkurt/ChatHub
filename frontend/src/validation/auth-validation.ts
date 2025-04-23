import { formatPhoneNumber } from "@/lib/formatPhoneNumber";
import { z } from "zod";


const phoneValidation = z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be longer than 15 digits")
    .refine((value) => {
        // Sadece rakamları alıyoruz
        const numbers = value.replace(/\D/g, "");
        // Telefon numarası 10-15 haneli olmalı
        return numbers.length >= 10 && numbers.length <= 15;
    }, {
        message: "Phone number must contain only numbers and be between 10 to 15 digits",
    })
    .transform(formatPhoneNumber);


export const registerSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: phoneValidation,
        birthDate: z.string().refine(
            (val) => {
                const date = new Date(val);
                return !isNaN(date.getTime());
            },
            { message: "Invalid date" }
        ),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});