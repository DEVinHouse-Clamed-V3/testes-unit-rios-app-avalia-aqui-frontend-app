import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Intro from '../src/screens/Intro'; // ajuste o caminho conforme sua estrutura
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe('Tela Intro', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  it('renderiza os elementos principais', () => {
    const { getByText } = render(<Intro />);
    expect(getByText('Bem-vindo ao Avalie Aqui')).toBeTruthy();
    expect(getByText('Começar')).toBeTruthy();
  });

  it('navega para a próxima tela ao pressionar o botão', () => {
    const { getByText } = render(<Intro />);
    fireEvent.press(getByText('Começar'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
