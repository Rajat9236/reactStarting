/* eslint-disable */

import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const MessageBlobBot = styled.p`
word-break: break-word;
width:fit-content;
margin: 0px;
background-color: ${props => props.themeData.theme_data.chat_box.bot_message_box_color};
border-radius: 12px;
line-height: 1.73;
padding: 8px 20px;
font-size: 12px;
font-weight: 500;
color: ${props => props.themeData.theme_data.chat_box.bot_message_font_color};
border-radius: 20px;
  animation: ${fadeIn} 250ms;
`;
export default MessageBlobBot;
