import React from 'react';
import { render } from '@testing-library/react-native';
import StackNavigator from './Stack';
import { AuthContext } from '../context/AuthContext';

describe('Componente StackNavigator', () => {
  it('renderiza a tela Home quando o usuário não está logado', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ isLoggedIn: false, login: jest.fn(), logout: jest.fn() }}>
        <StackNavigator />
      </AuthContext.Provider>
    );

    expect(getByText('IMDb')).toBeTruthy(); // Verifica se a tela Home é exibida
  });

  it('renderiza a tela Tabs quando o usuário está logado', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ isLoggedIn: true, login: jest.fn(), logout: jest.fn() }}>
        <StackNavigator />
      </AuthContext.Provider>
    );

    expect(getByText('PRODUTOS')).toBeTruthy(); // Verifica se a tela Tabs é exibida
  });
});