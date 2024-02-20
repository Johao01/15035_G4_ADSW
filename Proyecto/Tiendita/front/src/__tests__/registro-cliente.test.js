import React from "react";
import { render, screen } from "@testing-library/react";
import RegistroCliente from "../pages/registro-cliente";

test("Muestra el titulo de la sección de clientes", () => {
  render(<RegistroCliente />);
  const RegistroClienteElement = screen.getByTestId("rc-1");
  expect(RegistroClienteElement).toBeInTheDocument();
  expect(RegistroClienteElement).toHaveTextContent("GESTIÓN DE CLIENTES");
});
