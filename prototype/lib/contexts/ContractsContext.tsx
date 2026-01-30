"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Contract } from "@/lib/types/insurance";

interface ContractsContextType {
  contracts: Contract[];
  addContract: (contract: Omit<Contract, "id" | "createdAt">) => string;
  getContract: (id: string) => Contract | undefined;
}

const ContractsContext = createContext<ContractsContextType | null>(null);

export function ContractsProvider({ children }: { children: ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const addContract = useCallback(
    (data: Omit<Contract, "id" | "createdAt">) => {
      const id = `ctr-${Date.now()}`;
      const contract: Contract = {
        ...data,
        id,
        createdAt: new Date().toISOString(),
      };
      setContracts((prev) => [contract, ...prev]);
      return id;
    },
    []
  );

  const getContract = useCallback(
    (id: string) => contracts.find((c) => c.id === id),
    [contracts]
  );

  return (
    <ContractsContext.Provider
      value={{ contracts, addContract, getContract }}
    >
      {children}
    </ContractsContext.Provider>
  );
}

export function useContracts() {
  const ctx = useContext(ContractsContext);
  if (!ctx) throw new Error("useContracts must be used within ContractsProvider");
  return ctx;
}
