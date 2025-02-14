import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  justify-content: space-between;
  background-color: #333;
  z-index: 1000;
  max-width: 1280px;
  margin: 0 auto;
  align-self: center;
  & > h1 {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 32px;
  }
  & > nav > ul {
    display: flex;
    justify-content: flex-end;
    gap: 0 1rem;
  }
  & > nav > ul > li {
    list-style: none;
    & > a {
      padding: 1rem;
      border-radius: 4px;
      background-color: #171717;
      color: #e1e1e1;
      transition: 0.1s ease-in-out;
      border: 1px solid #171717;
      &:hover {
        border: 1px solid #646cff;
      }
    }
  }
`