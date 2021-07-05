/* eslint-disable */

import React from 'react';
import styled from 'styled-components';
const setUrl = (props)=> {
  if(props.themeData != undefined){
    return  (props.themeData.theme_data.chatbot_icons.chatbot_startOver_icon == undefined ? props.config.baseUrl + '/resources/Assets/start.svg': props.config.baseUrl + '/' + props.themeData.theme_data.chatbot_icons.chatbot_startOver_icon)    
  }
}
const StartImage = styled.img.attrs(props => ({
  src : setUrl(props)
}))`
  height: 18px;
  width:18px;
  cursor:pointer;
  vertical-align: middle;
`;

export default StartImage;
