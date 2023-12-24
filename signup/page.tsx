"use client";

import Input from "@/components/Input";
import prisma from "@/lib/prisma";
import { FormEvent } from "react";

const signUp = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newUser = await prisma.user.create({
      data: {
        lastName: formData.get("lastName") as string,
        firstName: formData.get("firstName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
    console.log(newUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input id="lastName" label="lastName" />
      <Input id="firstName" label="firstName" />
      <Input id="email" label="email" type="email" />
      <Input id="password" label="password" type="password" />
      <button type="submit">Valider</button>
    </form>
  );
};

export default signUp;
