import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Avaliation from './Avaliation';
import axios from 'axios';

jest.mock('axios');

describe('Componente Avaliation', () => {
  it('renderiza os campos do formulário corretamente', () => {
    const { getByPlaceholderText, getByText } = render(<Avaliation />);

    expect(getByPlaceholderText('Seu nome')).toBeTruthy();
    expect(getByPlaceholderText('Seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Descreva sua experiência...')).toBeTruthy();
    expect(getByText('Enviar Feedback')).toBeTruthy();
  });

  it('valida os campos obrigatórios', async () => {
    const { getByText } = render(<Avaliation />);

    fireEvent.press(getByText('Enviar Feedback'));

    await waitFor(() => {
      expect(getByText('Por favor, preencha todos os campos.')).toBeTruthy();
    });
  });

  it('envia o feedback com sucesso', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    const { getByPlaceholderText, getByText } = render(<Avaliation />);

    fireEvent.changeText(getByPlaceholderText('Seu nome'), 'João');
    fireEvent.changeText(getByPlaceholderText('Seu e-mail'), 'joao@example.com');
    fireEvent.changeText(getByPlaceholderText('Descreva sua experiência...'), 'Ótimo produto!');
    fireEvent.press(getByText('Enviar Feedback'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://192.168.15.7:3000/evaluations', {
        id: undefined,
        name: 'João',
        email: 'joao@example.com',
        feedback: 'Ótimo produto!',
        experience: '',
        recommend: false,
      });
    });
  });
});