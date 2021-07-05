import React, { useEffect, useState, Fragment } from 'react';
import { withTheme } from 'styled-components';
import MainDiv from '../primitives/Main-div';
import SecondSection from '../primitives/SecondSection';
import Image from '../primitives/Image';
const ErrorConversation = (props) => {
    const { config, configData } = props;
    

    return (
        <div>
        <MainDiv error>
            <SecondSection className="col-md-12 col-sm-12 col-xs-12" error>
                <div className = "error-div">
                <Image config={config}  errorImg height= "60px" width = "200px"/>      
                <p>Sorry Something went wrong.</p>
                </div>
            </SecondSection>
            </MainDiv>
    </div>
    )
}
export default withTheme(ErrorConversation);