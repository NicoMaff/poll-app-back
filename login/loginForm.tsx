"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { Squircle } from "corner-smoothing";
import Link from "next/link";
import { FormEvent, useRef } from "react";

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
  };

  return (
    <Squircle cornerRadius={8}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input id="email" label="Email" />
        <Input type="password" id="password" label="Mot de passe" />
        <Link href={"/"}>Mot de passe oublié ?</Link>
        <Button level="form">Je me connecte</Button>
        <Button level="form2">Je crée mon compte</Button>
      </form>
    </Squircle>
  );
};

export default LoginForm;
