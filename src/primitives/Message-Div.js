import React from 'react';
import styled from 'styled-components';


const MessageDiv = styled.div`

& .left-chat{
    margin: 0px 40px;
    margin-top:12px;
}

& .left-chat,& .right-chat{
    overflow:hidden;
}
& .button-msg div.button-inner{
    display:inline-block;
}
   
`;
export default MessageDiv;