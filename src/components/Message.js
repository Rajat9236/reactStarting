import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
// import Paragraph from '../primitives/Paragraph'
import MessageBlob from '../primitives/MessageBlob';
import MessageBlobUser from '../primitives/MessageBlobUser';
import Button from '../primitives/Button';
import SkipImage from '../primitives/SkipImage';
import MessageDiv from '../primitives/Message-Div';
import Anchor from '../primitives/Anchor';

const Message = (props) => {
    const { message, themeData, config, loading, typing, input } = props;
    const [text, setText] = useState('');
    const [isBot, setIsBot] = useState(true);
    const [response, setResponse] = useState({
        buttons: [],
        slot: false,
        slotValue: '',
        isDisable: false,
        confirm : false,
    });
    useEffect(() => {
        if (message.type == 'USER') {
            setText(message.value);
            if(document.getElementById('submit'))
                document.getElementById('submit').value = '';
            setIsBot(false)
        } else if (message.type == 'text') {
            setText(message.value);
            document.getElementById("submit").readOnly = false;
        } else if (message.type == 'response') {
           
            setText(message.value.data.title);
            
            setResponse({
                buttons: message.value.data.responses,
                slot: message.value.set_slots,
                slotValue: message.value.slot_value,
                isDisable: false
            })
            document.getElementById("submit").readOnly = false;
        } else {
            let response = JSON.parse(message);
            if (response.response.type == 'options') {
                setText(response.response.title);
                setResponse({
                    buttons: response.response.responses,
                    slot: response.set_slots,
                    slotValue: response.slot_value,
                    isDisable: false,
                    confirm: response.confirm
                })

                document.getElementById("submit").readOnly = false;
            } else if (response.type == 'text') {
                setText(response.response.responses[0].response);
                if(document.getElementById("submit")){
                    document.getElementById("submit").readOnly = false;
                }
            }
            else if(response.response.type == 'link'){
                setText(response.response.title);
                setResponse({
                    buttons: response.response.responses,
                    slot:response.set_slots,
                    slotValue: response.slot_value,
                    isDisable: false,
                    confirm: response.confirm
                })
                document.getElementById("submit").readOnly = false;
            }
            if(response.confirm == "true" && response.response.title.includes("SU-BOT-SKIP")){
                let test = response.response.title.replace(/SU-BOT-SKIP/g, "<span class='skip'>Skipped</span>");
                setText(test);
            }
            if(response.confirm == "true"){
                document.getElementById("submit").readOnly = true;
            }
         
        }
    }, []);


    const clickText = (button) => { 
        setResponse({
            ...response,
            isDisable: true
        });
        switch(button.response_type) {
            case 'lithium': 
                button.response = 'Web type chat client does not support lithium case';
                break;
            case 'zendesk_agent': 
                button.response = 'zendesk_live_agent';
                break;
            case 'live_agent': 
                button.response = 'Web type chat client does not support salesforce live agent';
                break;
        }
        const data = {
            label: button.label,
            value: button.response
        };
        props.onResponseSelect(data);
        
    }
    const clickResponse = (button) => {

        //if link return false
        if (isAnchor(button.label)) {
            return;
        }
        setResponse({
            ...response,
            isDisable: true
        }
        );
        let url = '';
        if(!response.confirm){
           if (response.slot == 'true' || response.slot == true) {
                url = '/' + button.response + '{' + response.slotValue + ':' + button.label + '}';
            } 
            else {
                url = '/' + button.response + '{' + button.label + '}';
            }
        }
        else{
            url = button.response.replace(/['"]+/g, '');
        }
        const data = {
            url: url,
            label: button.label
        };
        props.onButtonSelect(data);
    }

    const isAnchor = (str) => {
        return /^\<a.*\>.*\<\/a\>/i.test(str);
    }

    const showHtml = (str) => {
        return <span dangerouslySetInnerHTML={{ __html: str }} />
    }
    return (


        <MessageDiv>
            <li>
                {isBot ? <SkipImage icon height="20px" width="38px" config={config} themeData={themeData} className="left-img" /> : ''}
                {isBot ?
                    <div className="left-chat">
                        <div className="party">
                            <MessageBlob font="12px" margin="5px" themeData={themeData}>
                                {showHtml(text)}
                            </MessageBlob>
                        </div>
                        <div className="button-msg">

                            {response.buttons.map((button, index) =>
                                <div key={index} className="button-inner">
                                    {
                                    button.response_type == "response" ?
                                        <Button key={index} disabled={response.isDisable} onClick={() => clickResponse(button)} themeData={themeData}>{showHtml(button.label)}</Button>
                                    :
                                    button.response_type == "text" || button.response_type == "lithium"  || button.response_type == "live_agent" || button.response_type == "zendesk_agent" ?
                                        <Button key={index} disabled={response.isDisable} onClick={() => clickText(button)} themeData={themeData}>{showHtml(button.label)}</Button>
                                    :
                                        <Anchor key={index} disabled={response.isDisable} onClick={() => (window.open(button.response), '_blank')}>
                                            {showHtml(button.label)}
                                        </Anchor>
                                    }
                                </div>
                            )}

                        </div>
                    </div>
                    :
                    <div className="right-chat">
                        <div className="party">
                            {text == '' ? null :
                                <MessageBlobUser themeData={themeData}>
                                    {text}
                                </MessageBlobUser>

                            }
                        </div>
                    </div>
                }
            </li>
        </MessageDiv>
    )
}


export default withTheme(Message);
