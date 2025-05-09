import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from './Home';
import { AuthContext } from '../context/AuthContext';

describe('Componente Home', () => {
  const mockLogin = jest.fn();

  it('renderiza corretamente os textos e botão', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ isLoggedIn: false, login: mockLogin, logout: jest.fn() }}>
        <Home />
      </AuthContext.Provider>
    );

    expect(getByText('IMDb')).toBeTruthy();
    expect(getByText('Avalie Aqui')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });

  it('chama a função de login ao clicar no botão Entrar', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ isLoggedIn: false, login: mockLogin, logout: jest.fn() }}>
        <Home />
      </AuthContext.Provider>
    );

    fireEvent.press(getByText('Entrar'));

    expect(mockLogin).toHaveBeenCalled();
  });
});