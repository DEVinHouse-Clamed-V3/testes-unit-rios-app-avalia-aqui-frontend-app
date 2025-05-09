import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ListProduct from './ListPtoduct';
import axios from 'axios';

jest.mock('axios');

describe('Componente ListProduct', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Produto 1',
      price: 'R$ 50,00',
      brand: 'Marca 1',
      description: 'Descrição 1',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      name: 'Produto 2',
      price: 'R$ 100,00',
      brand: 'Marca 2',
      description: 'Descrição 2',
      image: 'https://example.com/image2.jpg',
    },
  ];

  it('renderiza a lista de produtos corretamente', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    const { getByText } = render(<ListProduct />);

    await waitFor(() => {
      expect(getByText('Produto 1')).toBeTruthy();
      expect(getByText('Produto 2')).toBeTruthy();
    });
  });

  it('exibe mensagem de erro ao falhar na requisição', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erro ao buscar produtos'));

    const { getByText } = render(<ListProduct />);

    await waitFor(() => {
      expect(getByText('Erro ao buscar produtos:')).toBeTruthy();
    });
  });
});