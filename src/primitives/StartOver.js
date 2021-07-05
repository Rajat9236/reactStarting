
import React from 'react';
import styled from 'styled-components';

const StartOverDiv = styled.div`
  background-color:  ${props => (props.start == "true" ? '#fff' : props.themeData.theme_data.chat_box.board_color)};
  text-align:center !important;
  padding:5px;
  cursor: pointer;

    a,a:hover{
        font-size:12px;
        color: rgb(153, 156, 158);
        text-decoration:none;
    }
 `;
 export default StartOverDiv