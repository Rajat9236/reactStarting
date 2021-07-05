import React from 'react';
import styled from 'styled-components';

const BackImage = styled.img.attrs(props => ({
    src :  (props.setting ? props.config.baseUrl + '/resources/Assets/settings.svg' : props.config.baseUrl + '/resources/Assets/back.svg')
    }))`
    height: ${props => props.height};
    width:${props => props.width};
    cursor:pointer;
    vertical-align: middle;
    `;
    export default BackImage;