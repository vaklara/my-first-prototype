import { z } from "zod";

const destinationSchema = z.enum([
  "evropa",
  "svet-bez-usa",
  "svet",
  "slovensko",
]);
const purposeSchema = z.enum(["turistická", "pracovní", "sportovní"]);
const packageSchema = z.enum(["zaklad", "standard", "komplet"]);

export const insuredPersonSchema = z.object({
  firstName: z.string().min(2, "Min. 2 znaky"),
  lastName: z.string().min(2, "Min. 2 znaky"),
  birthDate: z.string().min(1, "Povinné"),
  birthNumber: z.string().optional(),
});

export const tripSchema = z
  .object({
    destination: destinationSchema,
    departureDate: z.string().min(1, "Povinné"),
    returnDate: z.string().min(1, "Povinné"),
    purpose: purposeSchema,
  })
  .refine(
    (data) => new Date(data.departureDate) >= new Date(),
    { message: "Datum odjezdu musí být v budoucnosti", path: ["departureDate"] }
  )
  .refine(
    (data) => new Date(data.returnDate) >= new Date(data.departureDate),
    { message: "Datum návratu musí být po odjezdu", path: ["returnDate"] }
  );

export const contactSchema = z.object({
  email: z.string().email("Neplatný e-mail"),
  phone: z.string().min(9, "Min. 9 znaků"),
  street: z.string().min(3, "Min. 3 znaky"),
  city: z.string().min(2, "Min. 2 znaky"),
  zipCode: z.string().regex(/^\d{3}\s?\d{2}$/, "PSČ např. 110 00"),
  bankAccount: z.string().optional(),
});

export const productSchema = z.object({
  package: packageSchema,
  addOnStorno: z.boolean(),
  addOnCovid: z.boolean(),
  addOnSport: z.boolean(),
});

export const onboardingSchema = z.object({
  trip: tripSchema,
  insuredPersons: z.array(insuredPersonSchema).min(1, "Min. 1 pojištěnec"),
  contact: contactSchema,
  product: productSchema,
  gdprConsent: z.boolean().refine((v) => v === true, {
    message: "Povinný souhlas se zpracováním OÚ",
  }),
  termsConsent: z.boolean().refine((v) => v === true, {
    message: "Povinný souhlas s obchodními podmínkami",
  }),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
