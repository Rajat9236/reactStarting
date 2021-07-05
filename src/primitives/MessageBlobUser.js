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

const MessageBlobUser = styled.p`
  line-height: 1.73;
  background-color: ${props => props.themeData.theme_data.chat_box.user_message_box_color};
  float: right !important;
  color: ${props => props.themeData.theme_data.chat_box.user_message_font_color} !important;
  font-weight: 500;
  font-size:12px;
  padding: 8px 20px;
  text-transform: capitalize;
  border-radius: 20px !important;
  margin: 0px;
  word-break: break-word;
`;
export default MessageBlobUser;
