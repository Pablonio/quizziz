import React from 'react';

type HeaderProps = {
  userName: string;
};

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-xl">Examen</h1>
      <p>Nombre del Usuario: {userName}</p>
    </header>
  );
};

export default Header;
