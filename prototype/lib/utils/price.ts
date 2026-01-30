import type { ProductData, InsuredPerson, TripData } from "@/lib/types/insurance";
import { PACKAGE_PRICES, ADDON_PRICES } from "@/lib/data/constants";

export function getDaysBetween(start: string, end: string): number {
  const a = new Date(start);
  const b = new Date(end);
  return Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function getAgeAtDate(birthDate: string, atDate: string): number {
  const birth = new Date(birthDate);
  const at = new Date(atDate);
  let age = at.getFullYear() - birth.getFullYear();
  const m = at.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && at.getDate() < birth.getDate())) age--;
  return age;
}

export function calculatePrice(
  product: ProductData,
  insuredPersons: InsuredPerson[],
  trip: TripData
): number {
  const days = getDaysBetween(trip.departureDate, trip.returnDate);
  if (days <= 0) return 0;

  let basePerDay = PACKAGE_PRICES[product.package] / 7;
  let total = 0;

  for (const person of insuredPersons) {
    const age = getAgeAtDate(person.birthDate, trip.departureDate);
    let multiplier = 1;
    if (age < 18) multiplier = 0.6;
    else if (age >= 70) multiplier = 1.3;
    total += Math.ceil(basePerDay * days * multiplier);
  }

  if (product.addOnStorno) total += ADDON_PRICES.storno;
  if (product.addOnCovid) total += ADDON_PRICES.covid;
  if (product.addOnSport) total += ADDON_PRICES.sport;

  return total;
}
