"use client";

import Link from "next/link";
import { Group, Button, Text } from "@mantine/core";
import { useAuth } from "@/lib/contexts/AuthContext";

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header
      style={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        backgroundColor: "white",
      }}
    >
      <Group justify="space-between">
        <Text
          component={Link}
          href="/"
          fw={700}
          size="lg"
          c="green.7"
          style={{ textDecoration: "none" }}
        >
          Cestovní pojištění
        </Text>
        <Group>
          {isAuthenticated ? (
            <>
              <Button component={Link} href="/dashboard" variant="subtle" size="sm" color="green">
                Dashboard
              </Button>
              <Button component={Link} href="/onboarding" size="sm" color="green">
                Sjednat pojištění
              </Button>
              <Button
                variant="subtle"
                size="sm"
                color="gray"
                onClick={() => logout()}
                component={Link}
                href="/"
              >
                Odhlásit
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} href="/welcome" variant="subtle" size="sm" color="green">
                O produktu
              </Button>
              <Button component={Link} href="/demo-login" size="sm" color="green">
                Přihlásit se
              </Button>
            </>
          )}
        </Group>
      </Group>
    </header>
  );
}
