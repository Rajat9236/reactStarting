import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
    background-color: #f7f9fb;
    box-shadow: 0 3px 6px #0000000d;
    padding: 7px 14px 0px 14px;
    height: 53px;
    position: relative;
    z-index: 5;
    box-shadow: 0 3px 6px #00000029;

    & .logo-bot{
        display: inline-block;
        background-color: #e9eef4;
        border-radius: 4px;
        width: 36px;
        height: 36px;
    }

    & .loading-chat{
        color: rgb(131, 51, 51); 
        width: 250px;
        display: inline-block;
        position: relative;
        bottom: 15px;
        margin-top: 0px;
        height: 20px;
        left: 20px;
        border-radius: 10px;
        animation-duration: 3s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: Gradient;
        animation-timing-function: ease;
        background: linear-gradient(90deg,#f1f7f8 20%,#dfe7ec 50%,#eee 80%);
        background-size: 500px 100px;
    }
  `;

export default Loading;