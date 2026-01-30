"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Paper,
  Stepper,
  Button,
  Group,
  TextInput,
  Select,
  Checkbox,
  Stack,
  Title,
  Text,
  ScrollArea,
  Box,
} from "@mantine/core";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { FileUpload } from "@/components/FileUpload";
import { useContracts } from "@/lib/contexts/ContractsContext";
import { calculatePrice } from "@/lib/utils/price";
import {
  onboardingSchema,
  type OnboardingFormValues,
} from "@/lib/utils/schema";
import { DESTINATION_LABELS, PURPOSE_LABELS } from "@/lib/data/constants";
import { IPID_CONTENT } from "@/lib/data/ipid";

const STEPS = [
  "Cesta",
  "Pojištěnci",
  "Kontakt",
  "Produkt",
  "Předsmluvní info",
  "Shrnutí",
];

function OnboardingForm() {
  const router = useRouter();
  const { addContract } = useContracts();
  const [active, setActive] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      trip: {
        destination: "evropa",
        departureDate: "",
        returnDate: "",
        purpose: "turistická",
      },
      insuredPersons: [{ firstName: "", lastName: "", birthDate: "" }],
      contact: {
        email: "",
        phone: "",
        street: "",
        city: "",
        zipCode: "",
      },
      product: {
        package: "standard",
        addOnStorno: false,
        addOnCovid: false,
        addOnSport: false,
      },
      gdprConsent: false,
      termsConsent: false,
    },
  });

  const formValues = watch();

  const nextStep = () => setActive((a) => Math.min(a + 1, STEPS.length - 1));
  const prevStep = () => setActive((a) => Math.max(a - 1, 0));

  const onSubmit = (data: OnboardingFormValues) => {
    const price = calculatePrice(data.product, data.insuredPersons, data.trip);
    const id = addContract({
      trip: data.trip,
      insuredPersons: data.insuredPersons,
      contact: data.contact,
      product: data.product,
      price,
      status: "aktivní",
    });
    router.push(`/dashboard/contract/${id}`);
  };

  return (
    <Container size="md" py="xl">
      <Title order={2} c="green.7" mb="lg">
        Sjednání cestovního pojištění
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stepper active={active} onStepClick={setActive}>
          {/* Krok 1: Cesta */}
          <Stepper.Step label="Cesta">
            <Paper p="lg" mt="md">
              <Stack gap="md">
                <Select
                  label="Cíl cesty"
                  data={Object.entries(DESTINATION_LABELS).map(([v, l]) => ({ value: v, label: l }))}
                  {...register("trip.destination")}
                  value={formValues.trip?.destination}
                  onChange={(v) => setValue("trip.destination", v as OnboardingFormValues["trip"]["destination"])}
                />
                <TextInput
                  label="Datum odjezdu"
                  type="date"
                  {...register("trip.departureDate")}
                  error={errors.trip?.departureDate?.message}
                />
                <TextInput
                  label="Datum návratu"
                  type="date"
                  {...register("trip.returnDate")}
                  error={errors.trip?.returnDate?.message}
                />
                <Select
                  label="Účel cesty"
                  data={Object.entries(PURPOSE_LABELS).map(([v, l]) => ({ value: v, label: l }))}
                  {...register("trip.purpose")}
                  value={formValues.trip?.purpose}
                  onChange={(v) => setValue("trip.purpose", v as OnboardingFormValues["trip"]["purpose"])}
                />
              </Stack>
            </Paper>
          </Stepper.Step>

          {/* Krok 2: Pojištěnci */}
          <Stepper.Step label="Pojištěnci">
            <Paper p="lg" mt="md">
              <Stack gap="md">
                {formValues.insuredPersons?.map((_, i) => (
                  <Paper key={i} p="md" withBorder>
                    <Text size="sm" fw={500} mb="sm">Osoba {i + 1}</Text>
                    <Stack gap="sm">
                      <TextInput label="Jméno" {...register(`insuredPersons.${i}.firstName`)} error={errors.insuredPersons?.[i]?.firstName?.message} />
                      <TextInput label="Příjmení" {...register(`insuredPersons.${i}.lastName`)} error={errors.insuredPersons?.[i]?.lastName?.message} />
                      <TextInput label="Datum narození" type="date" {...register(`insuredPersons.${i}.birthDate`)} error={errors.insuredPersons?.[i]?.birthDate?.message} />
                    </Stack>
                  </Paper>
                ))}
                <Group>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() =>
                      setValue("insuredPersons", [
                        ...(formValues.insuredPersons || []),
                        { firstName: "", lastName: "", birthDate: "" },
                      ])
                    }
                  >
                    + Přidat osobu
                  </Button>
                  {formValues.insuredPersons?.length > 1 && (
                    <Button
                      variant="subtle"
                      size="sm"
                      color="red"
                      onClick={() =>
                        setValue(
                          "insuredPersons",
                          formValues.insuredPersons.slice(0, -1)
                        )
                      }
                    >
                      Odebrat osobu
                    </Button>
                  )}
                </Group>
                <FileUpload label="Nahrát doklad (volitelné)" />
              </Stack>
            </Paper>
          </Stepper.Step>

          {/* Krok 3: Kontakt */}
          <Stepper.Step label="Kontakt">
            <Paper p="lg" mt="md">
              <Stack gap="md">
                <TextInput label="E-mail" type="email" {...register("contact.email")} error={errors.contact?.email?.message} />
                <TextInput label="Telefon" placeholder="+420 123 456 789" {...register("contact.phone")} error={errors.contact?.phone?.message} />
                <TextInput label="Ulice a číslo" {...register("contact.street")} error={errors.contact?.street?.message} />
                <Group grow>
                  <TextInput label="Město" {...register("contact.city")} error={errors.contact?.city?.message} />
                  <TextInput label="PSČ" placeholder="110 00" {...register("contact.zipCode")} error={errors.contact?.zipCode?.message} />
                </Group>
                <TextInput label="Bankovní účet (volitelné)" {...register("contact.bankAccount")} />
              </Stack>
            </Paper>
          </Stepper.Step>

          {/* Krok 4: Produkt */}
          <Stepper.Step label="Produkt">
            <Paper p="lg" mt="md">
              <Stack gap="lg">
                <Select
                  label="Balíček"
                  data={[
                    { value: "zaklad", label: "Základ – 89 Kč/týden" },
                    { value: "standard", label: "Standard – 149 Kč/týden" },
                    { value: "komplet", label: "Komplet – 249 Kč/týden" },
                  ]}
                  value={formValues.product?.package}
                  onChange={(v) => setValue("product.package", v as OnboardingFormValues["product"]["package"])}
                />
                <Checkbox
                  label="Připojištění storna zájezdu (+49 Kč)"
                  {...register("product.addOnStorno")}
                  checked={formValues.product?.addOnStorno}
                  onChange={(e) => setValue("product.addOnStorno", e.target.checked)}
                />
                <Checkbox
                  label="COVID Plus (+29 Kč)"
                  {...register("product.addOnCovid")}
                  checked={formValues.product?.addOnCovid}
                  onChange={(e) => setValue("product.addOnCovid", e.target.checked)}
                />
                <Checkbox
                  label="Sportovní aktivity (+39 Kč)"
                  {...register("product.addOnSport")}
                  checked={formValues.product?.addOnSport}
                  onChange={(e) => setValue("product.addOnSport", e.target.checked)}
                />
                {formValues.trip && formValues.product && formValues.insuredPersons && (
                  <CalculatorWidget
                    product={formValues.product}
                    insuredPersons={formValues.insuredPersons}
                    trip={formValues.trip}
                  />
                )}
              </Stack>
            </Paper>
          </Stepper.Step>

          {/* Krok 5: Předsmluvní info */}
          <Stepper.Step label="Předsmluvní info">
            <Paper p="lg" mt="md">
              <Stack gap="lg">
                <ScrollArea h={200}>
                  <Box p="sm" bg="gray.0" style={{ borderRadius: 8 }}>
                    <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                      {IPID_CONTENT}
                    </Text>
                  </Box>
                </ScrollArea>
                <Text size="sm" c="dimmed">
                  Pojistné podmínky:{" "}
                  <a href="#" style={{ color: "var(--mantine-color-green-6)" }}>
                    Stáhnout PDF
                  </a>
                </Text>
                <Checkbox
                  label="Souhlasím se zpracováním osobních údajů (GDPR)"
                  {...register("gdprConsent")}
                  error={errors.gdprConsent?.message}
                  checked={formValues.gdprConsent}
                  onChange={(e) => setValue("gdprConsent", e.target.checked)}
                />
                <Checkbox
                  label="Souhlasím s obchodními podmínkami"
                  {...register("termsConsent")}
                  error={errors.termsConsent?.message}
                  checked={formValues.termsConsent}
                  onChange={(e) => setValue("termsConsent", e.target.checked)}
                />
              </Stack>
            </Paper>
          </Stepper.Step>

          {/* Krok 6: Shrnutí */}
          <Stepper.Completed>
            <Paper p="lg" mt="md">
              <Stack gap="md">
                <Title order={4}>Shrnutí</Title>
                <Text size="sm">
                  <strong>Cesta:</strong> {DESTINATION_LABELS[formValues.trip?.destination]} – od {formValues.trip?.departureDate} do {formValues.trip?.returnDate}
                </Text>
                <Text size="sm">
                  <strong>Pojištěnci:</strong> {formValues.insuredPersons?.length} osoba/y
                </Text>
                <Text size="sm">
                  <strong>Kontakt:</strong> {formValues.contact?.email}
                </Text>
                <CalculatorWidget
                  product={formValues.product!}
                  insuredPersons={formValues.insuredPersons!}
                  trip={formValues.trip!}
                />
              </Stack>
            </Paper>
          </Stepper.Completed>
        </Stepper>

        <Group justify="space-between" mt="xl">
          <Button variant="subtle" onClick={prevStep} disabled={active === 0}>
            Zpět
          </Button>
          {active < STEPS.length - 1 ? (
            <Button color="green" onClick={nextStep}>
              Další
            </Button>
          ) : (
            <Button type="submit" color="green">
              Sjednat pojištění
            </Button>
          )}
        </Group>
      </form>

      <Text size="sm" c="dimmed" mt="lg">
        <Link href="/dashboard" style={{ color: "var(--mantine-color-green-6)" }}>
          ← Zrušit a vrátit se na dashboard
        </Link>
      </Text>
    </Container>
  );
}

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingForm />
    </ProtectedRoute>
  );
}
