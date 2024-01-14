'use server'

import { FormEvent } from "react"

export const submitSignupForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/signup/submit', {
          method: 'POST',
          body: formData,
        })
     
        // Handle response if necessary
        const data = await response.json()
      } catch (e) {
        console.log(e);

      }
}