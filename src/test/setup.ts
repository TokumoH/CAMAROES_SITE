// Preparação comum a todos os testes (carregada pelo Vitest via vite.config.ts).
import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

afterEach(() => {
  cleanup()
  localStorage.clear()
})
