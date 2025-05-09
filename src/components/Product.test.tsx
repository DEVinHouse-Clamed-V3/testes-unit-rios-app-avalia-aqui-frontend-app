import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Product from './Product';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe('Componente Product', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  const mockProduct = {
    id: 1,
    name: 'Produto Teste',
    price: 'R$ 100,00',
    brand: 'Marca Teste',
    description: 'Descrição do produto teste',
    image: 'https://example.com/image.jpg',
  };

  it('renderiza corretamente as informações do produto', () => {
    const { getByText, getByTestId } = render(<Product {...mockProduct} />);

    expect(getByText(mockProduct.name)).toBeTruthy();
    expect(getByText(mockProduct.price)).toBeTruthy();
    expect(getByText(mockProduct.brand)).toBeTruthy();
    expect(getByText(mockProduct.description)).toBeTruthy();
    expect(getByTestId('product-image')).toBeTruthy();
  });

  it('navega para a tela de avaliação ao clicar no botão Avaliar', () => {
    const { getByText } = render(<Product {...mockProduct} />);

    fireEvent.press(getByText('Avaliar'));

    expect(mockNavigate).toHaveBeenCalledWith('Avaliacao', { id: '1' });
  });
});