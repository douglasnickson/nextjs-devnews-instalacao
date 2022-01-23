import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('Header component', () => {
  test('renders correctly', () => {
    const { getByAltText } = render(<Header />);
    screen.logTestingPlaygroundURL();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(getByAltText('DevNews!')).toBeInTheDocument();
  });
});
