import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
width: auto;
    max-height: 85px;
    display: inline-block;
    border-radius: 20px;
    background-color: ${props => props.themeData.theme_data.button_color};
    font-size: 12px;
    color: ${props => props.themeData.theme_data.chat_box_button_color};
    padding: 0 14px;
    margin: 0px 10px 10px 0px;
    border: none;
    min-height: 30px;
    cursor: pointer;

`;

export default Button;
