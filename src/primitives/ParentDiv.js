import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';


const ParentDiv = styled.div`

&.enter-chat-to{
  -webkit-transition: all 3s ;
  -moz-transition: all 3s ;
  -o-transition: all  3s ;
  transition: background-color 3s !important;
}
&.show-profile{
  z-index: 300;
  height: 440px;
  display: block;
  width: 450px;
  bottom: 40px;
  right: 22px;
  position: fixed;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fbfbfb;
  }
  &:not(.show-profile) {
    animation: widget-hide .5s backwards;
  }
  &.show-profile {
      animation: widget-show .5s forwards;
  }
  & .button-msg {
    margin: 10px  0 0 0;
    width: 100%;
  }
  & .right-chat {
    margin-right: 30px;
    margin: 0px 20px;
  }

  & ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 0px;
  }
  & ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  
  & ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  height: 25px;
    width: 25px;
    display: block;
    border-radius: 50%;
    position: fixed;
    bottom: 55px;
    right: 42px;
    overflow: hidden;
    font-family: ${ props =>  (props.error) ? "BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen'" :props.configData.theme_data.font.font_style };
    @media only screen and (min-width: 1600px){
      &.show-profile{
        height: 545px;
      }
    }
    @media only screen and (min-width: 320px) and (max-width: 480px) {
      &.show-profile {
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0px;
        z-index: 1045;
      }
  
`;

export default ParentDiv;
