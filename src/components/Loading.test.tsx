import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Loading from './Loading';

describe('Loading component', () => {
  it('renders loading text when isLoading is true', () => {
    render(<Loading isLoading={true} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders nothing when isLoading is false', () => {
    const { container } = render(<Loading isLoading={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
