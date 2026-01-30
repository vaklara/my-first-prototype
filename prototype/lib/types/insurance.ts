export type Destination = "evropa" | "svet-bez-usa" | "svet" | "slovensko";

export type TripPurpose = "turistická" | "pracovní" | "sportovní";

export type PackageType = "zaklad" | "standard" | "komplet";

export interface InsuredPerson {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthNumber?: string;
}

export interface TripData {
  destination: Destination;
  departureDate: string;
  returnDate: string;
  purpose: TripPurpose;
}

export interface ContactData {
  email: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  bankAccount?: string;
}

export interface ProductData {
  package: PackageType;
  addOnStorno: boolean;
  addOnCovid: boolean;
  addOnSport: boolean;
}

export interface OnboardingFormData {
  trip: TripData;
  insuredPersons: InsuredPerson[];
  contact: ContactData;
  product: ProductData;
  gdprConsent: boolean;
  termsConsent: boolean;
}

export interface Contract {
  id: string;
  createdAt: string;
  status: "aktivní" | "čekající" | "ukončená";
  trip: TripData;
  insuredPersons: InsuredPerson[];
  contact: ContactData;
  product: ProductData;
  price: number;
}
