import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ListProducts from '../src/screens/ListProducts'; // ajuste o caminho
import * as productActions from '../src/services/productService';

jest.mock('../src/services/productService');

describe('Tela de Listagem de Produtos', () => {
  const mockProducts = [
    { id: 1, name: 'Produto 1' },
    { id: 2, name: 'Produto 2' },
  ];

  beforeEach(() => {
    jest.spyOn(productActions, 'getAllProducts').mockResolvedValue(mockProducts);
  });

  it('renderiza os produtos corretamente', async () => {
    const { getByText } = render(<ListProducts />);

    await waitFor(() => {
      expect(getByText('Produto 1')).toBeTruthy();
      expect(getByText('Produto 2')).toBeTruthy();
    });
  });

  it('exibe mensagem se não houver produtos', async () => {
    productActions.getAllProducts.mockResolvedValueOnce([]);
    const { getByText } = render(<ListProducts />);

    await waitFor(() => {
      expect(getByText('Nenhum produto encontrado')).toBeTruthy();
    });
  });
});
