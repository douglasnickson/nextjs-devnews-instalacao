import { render, screen } from '@testing-library/react';
import Home from '../../pages';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('Header page', () => {
  test('renders correctly', () => {
    const { getByAltText, debug } = render(<Home />);
    debug();
    expect(screen.getByText('Olá Dev!')).toBeInTheDocument();
    expect(getByAltText('Home image')).toBeInTheDocument();
  });
});
