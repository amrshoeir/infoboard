import { z } from "zod";
import type { Schema } from "zod";
const pos = "Must be a positive number"
const string = "Must be a string"

// User validation schema
const userSchema = z.object({
  name: z.string().nullable(),
  username: z.string({required_error:"Username is required"}).min(3),
  email: z.string({required_error:"Email is required"}).email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'content_creator', 'inactive'])
});
// Layout editing validation schema
const ImageLayoutSchema = z.object({
  duration:z.number(),
  imageTitle:z.string({invalid_type_error:string}),
  imageMaxSize:z.number({invalid_type_error:pos}).max(10).min(0),
  galleryTitle:z.string({invalid_type_error:string}),
  galleryMaxSize:z.number({invalid_type_error:pos}).max(10).min(0),
  galleryMaxCount:z.number({invalid_type_error:pos}).max(10).min(0),
  galleryDefault:z.number({invalid_type_error:pos}).max(15).min(5)
})
export const validateUser = (formData: FormData, schema:Schema)=> {

}