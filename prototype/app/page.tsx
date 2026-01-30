import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, Container, Title, Text, Stack, Group } from "@mantine/core";

export default function HomePage() {
  return (
    <Container size="md" py={48}>
      <Stack gap="xl" align="center">
        <Title order={1} ta="center" c="green.7">
          Cestovní pojištění
        </Title>
        <Text ta="center" size="lg" c="dimmed">
          Pojištění, které prostě funguje. Žádné složitosti. Férové ceny.
        </Text>
        <Group>
          <Button component={Link} href="/welcome" size="lg" color="green">
            Sjednat pojištění
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
