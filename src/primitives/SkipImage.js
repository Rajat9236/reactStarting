/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const SkipImage = styled.img.attrs(props => ({
src : props.skip && props.themeData.theme_data.chatbot_icons.chatbot_skip_icon == undefined ? props.config.baseUrl + '/resources/Assets/skip_new.svg' : (props.skip && props.themeData.theme_data.chatbot_icons.chatbot_skip_icon != undefined ? props.config.baseUrl + '/' + props.themeData.theme_data.chatbot_icons.chatbot_skip_icon : props.config.baseUrl + '/' + props.themeData.theme_data.chatbot_icons.chatbot_icon)

}))`
  height: ${props => props.height};
  width: ${props => props.width};
  cursor:pointer;
  vertical-align: ${props => (props.skip ? 'middle' : 'unset')};
  position : ${props => (props.icon ? 'absolute' : '')};
  padding:  ${props => (props.icon ? '3px 10px' : '')};
  margin-top: ${props => (props.icon ? '10px' : '')};
  
`;

export default SkipImage;
