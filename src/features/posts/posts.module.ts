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

export const RenderedPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`

export const PostArticle = styled.article`
  display: flex;
  flex-grow: 1;
  flex-basis: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #a1a1a1;
  box-sizing: border-box;
  padding: 2rem;
  background-color: #171717;
  border-radius: 6px;
  min-width: 25%;
  height: 15dvh;
  & > p {
    font-size: clamp(12px, 1vw, 16px);
  }
  & > p, h2, h3 {
    margin: 0;
  }
`