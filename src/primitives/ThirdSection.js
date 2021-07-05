/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const ThirdSection = styled.div`
& div a{
    display: block;
    float: right;
    margin-top: 19px;
}
& .text-bar{
    background :${props => props.themeData.theme_data.type_message_area.board_color};
    &.disable-text{
        cursor: not-allowed;
    }
}
& .text-bar form{
    width:72%;
    display:inline-block;
    height:60px;
}
& .text-bar a .type-area > path{
    fill : ${props => props.themeData.theme_data.type_message_area.button_color} !important;
  }
& .text-bar .MuiTextField-root{
    width:72%;
    display:inline-block;
    margin-left: 10px;
    margin-top: 10px;
    vertical-align: unset;
}

& div a svg{
    margin-right:25px;
}

& div a {
    pointer-events : ${props => props.pointerEvents};
    cursor: pointer;
}
& .text-bar .MuiGrid-container{
    width: 77%;
    display:inline-grid;
}
@media only screen and (min-width: 320px) and (max-width: 480px) {
    &{
        position: fixed;
		bottom: 0;
		width: 100%;
    }
    & div a svg{
        margin-top: 2px;
    }
    & div a{
        margin-top: 20px;
		margin-right: 0px;
    }
}
`;

export default ThirdSection;
