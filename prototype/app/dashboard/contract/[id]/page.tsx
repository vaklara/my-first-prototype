"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Title,
  Button,
  Stack,
  Paper,
  Group,
  Text,
  Divider,
  List,
} from "@mantine/core";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useContracts } from "@/lib/contexts/ContractsContext";
import {
  DESTINATION_LABELS,
  PURPOSE_LABELS,
  PACKAGE_LABELS,
} from "@/lib/data/constants";

function ContractViewContent() {
  const params = useParams();
  const router = useRouter();
  const { getContract } = useContracts();
  const contract = getContract(params.id as string);

  if (!contract) {
    return (
      <Container size="md" py="xl">
        <Text>Smlouva nenalezena.</Text>
        <Button component={Link} href="/dashboard" mt="md" color="green">
          Zpět na dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={2} c="green.7">
            Smlouva {contract.id.slice(-8)}
          </Title>
          <Button
            component={Link}
            href="/dashboard"
            variant="light"
            color="green"
          >
            ← Zpět na přehled
          </Button>
        </Group>

        <Paper p="xl" radius="md" withBorder>
          <Stack gap="lg">
            <div>
              <Text size="sm" c="dimmed">
                Stav
              </Text>
              <Text fw={600}>{contract.status}</Text>
            </div>

            <Divider />

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Cesta
              </Text>
              <List size="sm">
                <List.Item>Destinace: {DESTINATION_LABELS[contract.trip.destination]}</List.Item>
                <List.Item>Odjezd: {new Date(contract.trip.departureDate).toLocaleDateString("cs-CZ")}</List.Item>
                <List.Item>Návrat: {new Date(contract.trip.returnDate).toLocaleDateString("cs-CZ")}</List.Item>
                <List.Item>Účel: {PURPOSE_LABELS[contract.trip.purpose]}</List.Item>
              </List>
            </div>

            <Divider />

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Pojištěnci
              </Text>
              <List size="sm">
                {contract.insuredPersons.map((p, i) => (
                  <List.Item key={i}>
                    {p.firstName} {p.lastName} – {new Date(p.birthDate).toLocaleDateString("cs-CZ")}
                  </List.Item>
                ))}
              </List>
            </div>

            <Divider />

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Kontakt
              </Text>
              <Text size="sm">
                {contract.contact.email} | {contract.contact.phone}
              </Text>
              <Text size="sm">
                {contract.contact.street}, {contract.contact.zipCode} {contract.contact.city}
              </Text>
            </div>

            <Divider />

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Produkt
              </Text>
              <Text size="sm">
                Balíček: {PACKAGE_LABELS[contract.product.package]}
              </Text>
              {(contract.product.addOnStorno || contract.product.addOnCovid || contract.product.addOnSport) && (
                <Text size="sm" mt={4}>
                  Připojištění:{" "}
                  {[
                    contract.product.addOnStorno && "Storno",
                    contract.product.addOnCovid && "COVID",
                    contract.product.addOnSport && "Sport",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              )}
            </div>

            <Divider />

            <div>
              <Text size="sm" c="dimmed">
                Celková cena
              </Text>
              <Title order={3} c="green.7">
                {contract.price} Kč
              </Title>
            </div>
          </Stack>
        </Paper>

        <Text size="xs" c="dimmed">
          Toto je zjednodušené zobrazení smlouvy (lightweight KZ). Plné znění je k dispozici v PDF.
        </Text>
      </Stack>
    </Container>
  );
}

export default function ContractPage() {
  return (
    <ProtectedRoute>
      <ContractViewContent />
    </ProtectedRoute>
  );
}
