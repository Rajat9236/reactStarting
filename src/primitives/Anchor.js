import React from 'react';
import styled from 'styled-components';

const Anchor = styled.a`
width: fit-content;
  cursor: pointer;
  text-decoration: none;
  padding: 5px 14px 5px;
  background-color: rgba(233,238,244,0.5);
  margin: 0px 10px 10px 0px;
  border-radius: 20px;
  color: #6e99fa;
  font-size:12px;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 20px;
  -webkit-box-orient: vertical;

  &:hover{
    text-decoration: underline;
    -ms-text-underline-position: under;
    text-underline-position: under;
  }
`;
export default Anchor;