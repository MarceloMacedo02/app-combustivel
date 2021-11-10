import { ReactNode } from 'react';

interface AccountProps {
  children?: ReactNode;
}

function Account({ children }: AccountProps) {
  return (
    <>
      <h1>Account</h1>

    </>
  );
}

export default Account;
