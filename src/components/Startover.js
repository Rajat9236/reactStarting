import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import StartOverDiv from '../primitives/StartOver';
import StartImage from '../primitives/StartImage';
const Startover = (props) => {
    const { config, themeData } = props;
    const startover = () => {
        props.startover();
        console.log('ther ',props.themeData)
    }
    return (
        <StartOverDiv themeData={themeData} config={config}>
            <a onClick={startover} >
                <span>
                    
                    <StartImage config={config} themeData={themeData} id="start-img" />
                </span>
            Start over Conversation
        </a>
        </StartOverDiv>
    )
}
export default Startover;