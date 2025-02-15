import styled from "styled-components";

export const EditPostsSection = styled.section`
  display: flex;
  flex-direction: column;
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
      width: 100%;
      outline: none;
      border: none;
      background: #333;
      resize: none;
      box-sizing: border-box;
    }
  }
  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: clamp(60%, 460px, 100%);
    border: 1px solid #464c5c;
    background-color: #464c5c;
    border-radius: 4px;
    box-sizing: border-box;
    margin: auto;
    padding: 1rem;
  }
`