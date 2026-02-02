import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input component', () => {
  it('renders label and input with correct props', () => {
    render(
      <Input
        id="test-input"
        label="Test Label"
        type="text"
        value="Hello"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toHaveValue('Hello');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <Input
        id="test-input"
        label="Test Label"
        type="text"
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'World' } });
    expect(handleChange).toHaveBeenCalledWith('World');
  });

  it('renders required and maxLength attributes', () => {
    render(
      <Input
        id="test-input"
        label="Test Label"
        type="text"
        required={true}
        maxLength={10}
        onChange={vi.fn()}
      />
    );
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('maxLength', '10');
  });
});
