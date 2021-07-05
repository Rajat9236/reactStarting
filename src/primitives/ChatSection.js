/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const ChatSection = styled.div`
overflow-y: scroll;
height:calc(100% - 30px);
padding: 0px 0 25px 0;
background-color: ${props => (props.load ? '#fff' : props.themeData.theme_data.chat_box.board_color)};

& .chat{
   display: ${props => (props.load ? 'none' : 'block')};
}
& div.hr {
   margin-top: 20px;
   margin-bottom: 20px;
   border: 0;
   border-top: 1px solid #eee;
   text-align: center !important;
   height: 0px;
   line-height: 0px;
 }
 & .hr-title {
   background-color: #fff;
 }
& div #load-img{
   position: absolute;
   bottom: 15%;
   width: 48px;
   right: 82%;
}
 ul{
    padding: 0px;
 }

 ul li{
    list-style: none;
    position: relative;
    margin-top: 5px;
 }
 @media only screen and (min-width: 1600px){
   &{
      height: calc(100% - 29px);
   }
 }
 @media only screen and (min-width: 320px) and (max-width: 480px) {
    &{
      height: calc(100vh - 167px);
      width:100%;
    }
 }
`;

export default ChatSection;
