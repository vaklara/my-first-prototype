"use client";

import { Paper, Text, Title } from "@mantine/core";
import { calculatePrice } from "@/lib/utils/price";
import type { ProductData, InsuredPerson, TripData } from "@/lib/types/insurance";

interface CalculatorWidgetProps {
  product: ProductData;
  insuredPersons: InsuredPerson[];
  trip: TripData;
}

export function CalculatorWidget({
  product,
  insuredPersons,
  trip,
}: CalculatorWidgetProps) {
  const price = calculatePrice(product, insuredPersons, trip);

  return (
    <Paper p="lg" radius="md" withBorder>
      <Text size="sm" c="dimmed" mb={4}>
        Orientační cena za rok
      </Text>
      <Title order={2} c="green.7">
        {price} Kč
      </Title>
      <Text size="xs" c="dimmed" mt={4}>
        cca {Math.ceil(price / 12)} Kč/měsíc
      </Text>
    </Paper>
  );
}
