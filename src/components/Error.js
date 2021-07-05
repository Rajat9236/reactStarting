import React, { useEffect, useState, Fragment } from 'react';
import { withTheme } from 'styled-components';
import HeaderArea from '../primitives/HeaderArea';
import Paragraph from '../primitives/Paragraph';
import Image from '../primitives/Image';
import Span from '../primitives/Span';
const Error = (props) => {
    const { config,configData } = props;
    const closeCall = () => {
        props.closeCall();
    }

    return (
        <HeaderArea configData={configData} className="col-md-8 col-sm-6 col-xs-6" id="notLoading" error>
            <Paragraph font="14px" margin="0px">
                <Image configData={configData} config={config} height="32px" width="36px" align errorhead/>
                <Span error>SearchUnify Bot</Span>
                <Image configData={configData} onClick={closeCall} config={config} height="24px" width="24px" error/>
            </Paragraph>
        </HeaderArea>
    )

}
export default withTheme(Error);