import React from 'react';
import styled from 'styled-components';

const LoadingList = styled.div`
    & div.party{
        border-radius: 20px;
        padding: 9px 20px;
        width: 250px;
        background: linear-gradient(90deg,#f1f7f8 20%,#dfe7ec 50%,#eee 80%);
        animation: Gradient 3s ease infinite;
        background-size: 500px 100px;
    }
    & .load-msg .left-chat:nth-child(2) .party{
        width: 125px;
    }
    &  div.party:nth-child(3){
        width: 80px;
    }
    & div.party:nth-child(4){
        width: 150px;
    }
    & .chat{
        display:none;
    }
    & .load-msg:nth-child(1), & .load-msg:nth-child(3){
        float:left;
    }
    & .load-msg:nth-child(2), & .load-msg:nth-child(4){
        float:right;
    }
    & .right-chat .response{
        background: linear-gradient(90deg,#f1f7f8 20%,#dfe7ec 50%,#eee 80%);
        animation: Gradient 3s ease infinite;
        background-size: 500px 100px;
        width: 150px;
        border-radius: 20px;
        padding: 8px;
        margin: 0px;
    }

    & .right-chat:nth-child(2) .response{
        width: 70px;
    }
    & .left-chat,& .right-chat{
      margin: 10px 40px;
    }

`;

export default LoadingList;