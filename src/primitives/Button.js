import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
width: auto;
    max-height: 85px;
    display: inline-block;
    border-radius: 20px;
    background: ${props => props.themeData.theme_data.chat_box.chat_box_button_color};
    font-size: 12px;
    color: ${props => props.themeData.theme_data.chat_box.chat_box_button_text_color};
    padding: 0 14px;
    font-family: ${props => props.themeData.theme_data.font.font_style};
    margin: 0px 10px 10px 0px;
    border: none;
    min-height: 30px;
    cursor: pointer;


    &:focus,&:hover{
        outline: 0;
        background-image: linear-gradient(to left, #55c7ff, #7886f7);
        color: #fff !important;
        border:none;
        background-repeat: no-repeat;
        box-shadow: 1px -1px 10px 1px rgba(0, 0, 0, 0.04);
    }
`;

export default Button;
