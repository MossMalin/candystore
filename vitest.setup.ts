import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Auto-clean between tests
afterEach(() => {
  cleanup();
});
