import { ReactNode } from 'react';

interface VeiculoProps {
  children: ReactNode;
}

function Veiculo({ children }: VeiculoProps) {
  return (
    <>
      <h1>Veiculo</h1>
      {children}
    </>
  );
}

export default Veiculo;
