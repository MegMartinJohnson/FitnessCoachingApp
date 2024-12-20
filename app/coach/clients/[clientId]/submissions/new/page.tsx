import { Metadata } from "next"
import { FormBuilder } from "@/components/form-builder/form-builder"

export const metadata: Metadata = {
  title: "New Check-In Form",
  description: "Create a new check-in form for your client",
}

export default function NewFormPage() {
  return <FormBuilder />
}

