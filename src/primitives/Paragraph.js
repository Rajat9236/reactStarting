import React from 'react';
import styled from 'styled-components';


const Paragraph = styled.p`
color: #fff;
font-weight: 600;
margin: ${props => props.margin};
font-size: ${props => props.font};
`;

export default Paragraph;