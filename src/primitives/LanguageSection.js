import React from 'react';
import styled from 'styled-components';

const LanguageSection = styled.div`
 & .settings-new{

    opacity: 0.87;
    transition: opacity 0.5s linear;
    z-index: 999999;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 450px;
    width: 449px;
    background-color: #000;
 }

 & .lang-logo{
    position: absolute;
    top: 7%;
    transform: translateY(-50%);
    left: 8px;
    height: 32px;
    width: 32px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    cursor:pointer
 }

 & .select-option {
    color: #101820;
    background-color: #FFFFFF;
}

& #mySelect{
    height:30px;
    width:100%;
    background-color: #656568;
    -webkit-appearance: none;
    appearance: none;
    padding: 0 32px 0 8px;
    height: 32px;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    width: 100%;
    font-size: 14px;
    color: white;
}

& .Select__icon-container {
    position: absolute;
    top: 31.5%;
    right: 20px;
    /* bottom: -24px; */
    width: 32px;
    pointer-events: none;
}
& .pad-top label{
    padding:0 26px;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
}

& .lang-heading{
    position: absolute;
    color: #FFFFFF;
    top: 7%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    text-align: center;
    user-select: none;
    pointer-events: none;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
}
& .pad-top{
    padding-top:110px;
}
& form{
    padding:0 26px;
    padding-top:10px;
}

@media only screen and (min-width: 320px) and (max-width: 480px) {
    & .settings-new{
        height:100%;
    }
    & #mySelect{
        width:80%;
    }
    & .Select__icon-container{
        top: 23.57%;
        right: 98px;
    }
    & .lang-heading{
        right:79px;
    }
 }
`

;
export default LanguageSection;
