import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Toast from './Toast';

describe('Toast component', () => {
  it('renders the message', () => {
    render(<Toast message="Hello Toast!" onClose={vi.fn()} />);
    expect(screen.getByText('Hello Toast!')).toBeInTheDocument();
  });

  it('calls onClose after duration', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Bye Toast!" duration={1000} onClose={onClose} />);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
