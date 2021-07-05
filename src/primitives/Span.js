import React from 'react';
import styled from 'styled-components';


const Span = styled.span`
margin: 14px 17px;
display: inline-block;
font-size: 14px;
position: relative;
width:65%;
color: ${props => (props.error ? '#fff' : props.configData.theme_data.title.text_color)};


@media only screen and (min-width: 320px) and (max-width: 480px) {
    &{
        width:59%;
    }
}
`;

export default Span;