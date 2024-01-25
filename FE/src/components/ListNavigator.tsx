import styled, { css } from 'styled-components';

import { primaryFont, fontSize } from '@/styles/font';
import Wrapper from '@/components/Wrapper';

const Nav = styled.nav`
  width: 100%;
  border-bottom: solid 1px var(--rp-grey-300);
`;

const NavItem = styled.button`
  ${primaryFont.bold}
  ${fontSize.l}
  padding: 16px;
  background-color: transparent;
  border: 0;
  ${(props) => {
    if (props.clicked) {
      return css`
        border-bottom: solid 1px var(--rp-white);
        &:hover {
          cursor: none;
        }
      `;
    }
    return css`
      color: var(--rp-grey-300);
    `;
  }}
`;

const ListNavigator = ({ children, navItems }) => {
  return (
    <Wrapper margin="48px 0 0">
      <Nav>
        {navItems.map((item, idx) => {
          return (
            <NavItem key={idx} clicked={item.clicked}>
              {item.name}
            </NavItem>
          );
        })}
      </Nav>
      {children}
    </Wrapper>
  );
};

export default ListNavigator;
