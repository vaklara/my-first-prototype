"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Title,
  Button,
  Stack,
  Table,
  Group,
  Text,
  Paper,
} from "@mantine/core";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useContracts } from "@/lib/contexts/ContractsContext";
import { DESTINATION_LABELS } from "@/lib/data/constants";

function DashboardContent() {
  const { user, logout } = useAuth();
  const { contracts } = useContracts();
  const router = useRouter();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2} c="green.7">
              Klientská zóna
            </Title>
            <Text size="sm" c="dimmed">
              Přihlášen: {user?.email}
            </Text>
          </div>
          <Group>
            <Button component={Link} href="/onboarding" color="green">
              Sjednat nové pojištění
            </Button>
            <Button variant="subtle" color="gray" onClick={() => { logout(); router.push("/"); }}>
              Odhlásit se
            </Button>
          </Group>
        </Group>

        <Paper p="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Mé smlouvy
          </Title>
          {contracts.length === 0 ? (
            <Text c="dimmed">
              Zatím nemáte žádné smlouvy.{" "}
              <Link href="/onboarding" style={{ color: "var(--mantine-color-green-6)" }}>
                Sjednat pojištění
              </Link>
            </Text>
          ) : (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Destinace</Table.Th>
                  <Table.Th>Odjezd</Table.Th>
                  <Table.Th>Cena</Table.Th>
                  <Table.Th>Stav</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {contracts.map((c) => (
                  <Table.Tr key={c.id}>
                    <Table.Td>{c.id.slice(-8)}</Table.Td>
                    <Table.Td>{DESTINATION_LABELS[c.trip.destination]}</Table.Td>
                    <Table.Td>{new Date(c.trip.departureDate).toLocaleDateString("cs-CZ")}</Table.Td>
                    <Table.Td>{c.price} Kč</Table.Td>
                    <Table.Td>{c.status}</Table.Td>
                    <Table.Td>
                      <Button
                        component={Link}
                        href={`/dashboard/contract/${c.id}`}
                        variant="light"
                        size="xs"
                        color="green"
                      >
                        Zobrazit
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
