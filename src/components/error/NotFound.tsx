import styled from 'styled-components';

const NotFound = () => {
  return <Container>존재하지 않는 페이지 입니다.</Container>;
};

export default NotFound;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
  margin-top: 100px;
`;
