"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Alert,
} from "@mantine/core";

export default function DemoLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Neplatné přihlašovací údaje. Pro demo použijte: demo@example.com / demo123");
    }
  };

  return (
    <Container size="xs" py={48}>
      <Paper p="xl" shadow="md" radius="md">
        <Stack gap="lg">
          <div>
            <Title order={2} c="green.7">
              Přihlášení
            </Title>
            <Text size="sm" c="dimmed" mt={4}>
              Demo přihlášení – klientská zóna
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="E-mail"
                placeholder="demo@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PasswordInput
                label="Heslo"
                placeholder="demo123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <Alert color="red" variant="light">
                  {error}
                </Alert>
              )}
              <Button type="submit" color="green" fullWidth>
                Přihlásit se
              </Button>
            </Stack>
          </form>

          <Text size="xs" c="dimmed" ta="center">
            Demo: demo@example.com / demo123
          </Text>

          <Text size="sm" ta="center">
            <Link href="/" style={{ color: "var(--mantine-color-green-6)" }}>
              ← Zpět na úvod
            </Link>
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
