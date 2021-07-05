/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const Image = styled.img.attrs(props => ({
  src : props.primary ? props.config.baseUrl + "/" + props.configData.theme_data.chatbot_icons.chatbot_close_icon : props.config.baseUrl + '/' + props.configData.theme_data.chatbot_icons.chatbot_avatar ,
}))
`
  margin-bottom: 3px;
  
  width: ${props => props.width};
  height: ${props => props.height};
  float: ${props => (props.primary || props.error? 'right' : 'none')};
  vertical-align : ${props => (props.align || props.error ? 'middle' : 'unset')};
  margin-top: ${props => (props.primary || props.error ? '12px' : '0px')};
  cursor: ${props => (props.primary || props.error? 'pointer' : 'default')};
`

;

export default Image;
