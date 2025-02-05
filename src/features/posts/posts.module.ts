import styled from "styled-components";

export const PostsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  margin: auto;
  gap: 1rem;
  font-size: 18px;
  & > * {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 0 auto;
    gap: 1rem;
    box-sizing: border-box;
    color: #fff;
    & > button {
      color: #f1f1f1;
    }
    & > input, textarea, select {
      padding: 4px 8px;
      border-radius: 4px;
      outline: none;
      border: none;
      background: #444;
      resize: none;
    }
  }
`