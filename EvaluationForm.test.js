import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EvaluationForm from '../src/screens/EvaluationForm'; // ajuste o caminho
import * as evaluationService from '../src/services/evaluationService';

jest.mock('../src/services/evaluationService');

describe('Formulário de Avaliação', () => {
  const mockSubmit = jest.spyOn(evaluationService, 'submitEvaluation').mockResolvedValue({ success: true });

  it('renderiza os campos corretamente', () => {
    const { getByPlaceholderText, getByText } = render(<EvaluationForm />);
    expect(getByPlaceholderText('Seu nome')).toBeTruthy();
    expect(getByPlaceholderText('Comentário')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
  });

  it('valida campos obrigatórios', async () => {
    const { getByText } = render(<EvaluationForm />);
    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(getByText('Nome é obrigatório')).toBeTruthy();
      expect(getByText('Nota é obrigatória')).toBeTruthy();
    });
  });

  it('envia a avaliação com dados válidos', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<EvaluationForm />);

    fireEvent.changeText(getByPlaceholderText('Seu nome'), 'Maria');
    fireEvent.changeText(getByTestId('rating-input'), '5');
    fireEvent.changeText(getByPlaceholderText('Comentário'), 'Ótimo app!');
    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Maria',
        rating: '5',
        comment: 'Ótimo app!',
      });
    });
  });
});
