import React from 'react';
import styled from 'styled-components';

const ButtonEnd = styled.a`
border-color: #09527e;
  position: fixed;
  bottom: 40px;
  right: 22px;
  color: #09527e;
  text-align: center;
  width: 60px;
  height: 60px;
  opacity: 1;
  z-index: 100;
  background: linear-gradient(to left, #55C7FF, #7886f7);
  border-radius: 50%;
  background-repeat: no-repeat;
  display: block;
  -webkit-backface-visibility: hidden;
  -webkit-transition: all 3s;
  transition: all 3s;
  border:none;

  & .startChat{
    background-image: url("${props => props.config.baseUrl}//resources/Assets/closeChat.svg");
    padding: 14px 18px;
    background-repeat: no-repeat;
    margin: 15px 13px;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    &{
      bottom:80px;
    }
  }
`;

export default ButtonEnd;
