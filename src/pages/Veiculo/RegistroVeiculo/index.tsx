import { ReactNode } from 'react';

interface RegistroVeiculoProps {
  children: ReactNode;
}

function RegistroVeiculo({ children }: RegistroVeiculoProps) {
  return (
    <>
      <h1>RegistroVeiculo</h1>
      {children}
    </>
  );
}

export default RegistroVeiculo;
