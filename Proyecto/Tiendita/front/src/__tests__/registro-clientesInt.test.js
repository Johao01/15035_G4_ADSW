import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistroCliente from "../pages/registro-cliente";

test("Verificación de elementos en el formulario por testId", async () => {
  render(<RegistroCliente />);

  // Haz clic en el botón para mostrar el formulario
  fireEvent.click(screen.getByTestId("rc-butonIngr"));

  // Espera a que aparezca el formulario (puedes ajustar el selector según tu implementación)
  await screen.findByTestId("rc-ci");

  // Verificar que los elementos del formulario estén presentes por testId
  expect(screen.getByTestId("rc-ci")).toBeInTheDocument(); // Cedula
  expect(screen.getByTestId("rc-pname")).toBeInTheDocument(); // Primer Nombre
  expect(screen.getByTestId("rc-sname")).toBeInTheDocument(); // Segundo Nombre
  expect(screen.getByTestId("rc-pap")).toBeInTheDocument(); // Primer Apellido
  expect(screen.getByTestId("rc-sap")).toBeInTheDocument(); // Segundo Apellido
  expect(screen.getByTestId("rc-telf")).toBeInTheDocument(); // Teléfono
  expect(screen.getByTestId("rc-dir")).toBeInTheDocument(); // Dirección
  expect(screen.getByTestId("rc-email")).toBeInTheDocument(); // Correo Electrónico
  expect(screen.getByTestId("rc-nac")).toBeInTheDocument(); // Fecha de Nacimiento
  expect(screen.getByTestId("rc-btnregistro")).toBeInTheDocument(); // Botón de Registro

  // Puedes agregar más verificaciones según los demás campos del formulario
});
