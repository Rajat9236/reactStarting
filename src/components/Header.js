import React from 'react';
import { withTheme } from 'styled-components';
import HeaderArea from '../primitives/HeaderArea';
import Paragraph from '../primitives/Paragraph';
import Image from '../primitives/Image';
import Span from '../primitives/Span';
import BackImage from '../primitives/BackImage';

const Header = (props) => {
    const { config, configData, agentInfo } = props;
    const closeCall = () => {
        
        props.closeCall();
        closeAgent();
    }
    const openLang = () => {
        props.openLang();
    }
    const closeAgent = () => {
        props.closeAgent();
    }
    return (
        <HeaderArea className="col-md-8 col-sm-6 col-xs-6" id="notLoading" configData={configData}>
        <Paragraph font="14px" margin="0px">
            <Image config={config} configData={configData} height="32px" width="36px" align />
            <Span configData={configData} >{ (agentInfo.status) ? agentInfo.name :configData.basic_conf_data.bot_title}</Span>
            {
                (agentInfo.status) ?
                <span className="settings" onClick={closeAgent}>
                    Cancel
                </span>
                :
                <span className="settings" onClick={openLang}>
                  <BackImage config = {config} setting height = "24px" width = "24px"/>
                </span>
            

            }
            <Image onClick={closeCall} config={config} configData={configData} height="24px" width="24px" primary />
        </Paragraph>
     </HeaderArea>
    )

}

export default withTheme(Header);
