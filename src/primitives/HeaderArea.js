import React from 'react';
import styled from 'styled-components';


const HeaderArea = styled.div`
padding: 7px 14px 0px 14px;
height: 53px;
position: relative;
z-index: 5;
background-color: ${props => props.configData.theme_data.title.board_color};
box-shadow: 0 3px 6px #00000029;

& .settings{
    cursor:pointer;
}
`;

export default HeaderArea;
