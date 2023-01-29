import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import useUserLoggedIn from '../../hooks/auth/useUserLoggedIn';
import useLogout from '../../hooks/auth/useLogout';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  const { isLoggedIn, user } = useUserLoggedIn();
  const logout = useLogout();

  useEffect(() => {
    if (isLoggedIn && router.pathname === '/login') {
      router.push('/');
    }
  }, [router, isLoggedIn]);

  return (
    <>
      <Background />
      <Content>
        <Header>
          <Link href='/'>
            <Title>HAUS</Title>
          </Link>
          {isLoggedIn ? (
            <HeaderContents>
              <p>{user.name}</p>
              <LogoutButton onClick={logout}>logout</LogoutButton>
            </HeaderContents>
          ) : (
            <Link href='/login'>
              <p>login</p>
            </Link>
          )}
        </Header>
        {children}
      </Content>
    </>
  );
};

export default Layout;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const HeaderContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
