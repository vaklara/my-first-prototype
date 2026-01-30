"use client";

import { useState, useRef } from "react";
import { Group, Button, Text, Paper, Stack } from "@mantine/core";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPT = "image/jpeg,image/png,application/pdf";

interface FileUploadProps {
  label?: string;
  onFileSelect?: (file: File) => void;
  value?: File | null;
}

export function FileUpload({
  label = "Nahrát doklad",
  onFileSelect,
  value,
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;

    if (file.size > MAX_SIZE) {
      setError("Soubor je příliš velký (max 5 MB)");
      return;
    }
    const type = file.type;
    if (!ACCEPT.includes(type) && !type.startsWith("image/")) {
      setError("Povolené formáty: JPG, PNG, PDF");
      return;
    }
    onFileSelect?.(file);
  };

  const triggerCamera = () => {
    if (inputRef.current) {
      inputRef.current.setAttribute("capture", "environment");
      inputRef.current.click();
    }
  };

  const triggerFile = () => {
    if (inputRef.current) {
      inputRef.current.removeAttribute("capture");
      inputRef.current.click();
    }
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="sm">
        <Text size="sm" fw={500}>
          {label}
        </Text>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <Group>
          <Button variant="light" size="sm" color="green" onClick={triggerCamera}>
            Vyfotit
          </Button>
          <Button variant="light" size="sm" color="gray" onClick={triggerFile}>
            Vybrat soubor
          </Button>
        </Group>
        {value && (
          <Text size="xs" c="dimmed">
            {value.name} ({(value.size / 1024).toFixed(1)} KB)
          </Text>
        )}
        {error && (
          <Text size="xs" c="red">
            {error}
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
