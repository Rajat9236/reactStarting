/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const SecondSection = styled.div`
padding: 0px;
margin: 0px;
background-color:#f3f3f3;
height: 330px;

@media only screen and (min-width: 1600px){
    &{
        height: 430px;
    }
  }
@media only screen and (min-width: 320px) and (max-width: 480px) {
    &{
        height: calc(100vh - 120px);
    }    
}
`;

export default SecondSection;
