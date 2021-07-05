/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const UserInput = styled.input.attrs(props => ({
  type: "text",
}))`
color: ${props => props.themeData.theme_data.type_message_area.text_color};
border: none;
background-color: transparent;
height: auto;
width: 77%;
height: 57px;
padding: 9px 18px 0px 18px;
font-weight: 500;
font-family: ${props => props.themeData.theme_data.font.font_style};
box-shadow: none;
  &:focus {
    outline: none;  
  }
  &.disable{
    cursor:not-allowed;
    pointer-events:none;
  } 
`;
// console.log(props,"props");
export default UserInput;
