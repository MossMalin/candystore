import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: { status: 'success', data: mockTags } }),
}));

import { Tags } from './Tags';
import { MemoryRouter } from 'react-router';

const mockTags = [
  { id: 1, name: 'Sweet', slug: 'sweet' },
  { id: 2, name: 'Sour', slug: 'sour' },
];

describe('Tags component', () => {
  it('renders all tags and highlights active', () => {
    const onTagClick = vi.fn();
    render(
      <MemoryRouter initialEntries={[{ search: '?tag=2' }]}>
        <Tags onTagClick={onTagClick} />
      </MemoryRouter>
    );
    expect(screen.getByText('Show all')).toBeInTheDocument();
    expect(screen.getByText('Sweet')).toBeInTheDocument();
    expect(screen.getByText('Sour')).toBeInTheDocument();
    // 'Sour' should be active
    expect(screen.getByText('Sour')).toHaveClass('active');
  });

  it('calls onTagClick with correct value', async () => {
    const onTagClick = vi.fn().mockResolvedValue(undefined);
    render(
      <MemoryRouter>
        <Tags onTagClick={onTagClick} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Show all'));
    expect(onTagClick).toHaveBeenCalledWith('');
    fireEvent.click(screen.getByText('Sweet'));
    expect(onTagClick).toHaveBeenCalledWith('/1');
  });
});
