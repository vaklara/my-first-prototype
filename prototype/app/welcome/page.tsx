import Link from "next/link";
import {
  Container,
  Title,
  Text,
  Stack,
  Button,
  SimpleGrid,
  Paper,
  Group,
} from "@mantine/core";

export default function WelcomePage() {
  return (
    <Container size="lg" py={48}>
      <Stack gap="xl">
        <Stack gap="md" ta="center">
          <Title order={1} c="green.7">
            Cestovní pojištění online
          </Title>
          <Text size="lg" c="dimmed">
            Hotovo za 3 minuty. Aktivní okamžitě. Krytí až 100 000 Kč/rok.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Paper p="lg" shadow="sm" radius="md">
            <Text fw={600} mb="xs">
              Jednoduché
            </Text>
            <Text size="sm" c="dimmed">
              Vyplníte pár údajů, pojištění máte okamžitě.
            </Text>
          </Paper>
          <Paper p="lg" shadow="sm" radius="md">
            <Text fw={600} mb="xs">
              Rychlé
            </Text>
            <Text size="sm" c="dimmed">
              Sjednání trvá jen několik minut.
            </Text>
          </Paper>
          <Paper p="lg" shadow="sm" radius="md">
            <Text fw={600} mb="xs">
              Férové
            </Text>
            <Text size="sm" c="dimmed">
              Transparentní ceny bez skrytých poplatků.
            </Text>
          </Paper>
        </SimpleGrid>

        <Group justify="center">
          <Button component={Link} href="/demo-login" size="lg" color="green">
            Sjednat pojištění →
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
