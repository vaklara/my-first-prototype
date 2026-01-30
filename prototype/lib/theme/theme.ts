import { createTheme, MantineColorsTuple } from "@mantine/core";

const green: MantineColorsTuple = [
  "#e6f9f0",
  "#d0f0e1",
  "#a5e1c6",
  "#76d1a9",
  "#51c391",
  "#38b982",
  "#28b379",
  "#199c67",
  "#0a8a57",
  "#007847",
];

export const theme = createTheme({
  primaryColor: "green",
  colors: {
    green,
  },
  fontFamily: "system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
});
