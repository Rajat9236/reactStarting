import React, { useEffect, useState } from 'react';
import { injectGlobal } from 'styled-components';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header'
import Conversation from './components/Conversation'
import './fonts.css';
import MainDiv from './primitives/Main-div';
import ParentDiv from './primitives/ParentDiv';
import ButtonEnd from './primitives/ButtonEnd';
import Loading from './primitives/Loading';
import LoadingList from './primitives/LoadingList';
import SecondSection from './primitives/SecondSection';
import ChatSection from './primitives/ChatSection';
import StartImage from './primitives/StartImage';
import StartOver from './primitives/StartOver';
import ErrorConversation from './components/ErrorConversation';
import Error from './components/Error';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const getId = function () {
    if (typeof GzAnalytics != "undefined") {
        return GzAnalytics.getsid();
    }
    else {
        return Math.floor(Math.random() * (3541648159412397 - 1594123973541648 + 1)) + 1594123973541648;
    }
}

const defaultConfig = { "theme_data": { "chat_box": { "board_color": "#FFFFFF", "bot_message_box_color": "#E9EEF4", "bot_message_font_color": "#999C9E", "button_color": "#F1F2F6", "user_message_box_color": "#6E99FA", "user_message_font_color": "#FFFFFF", "chat_box_button_color": "#E9EEF4", "chat_box_button_text_color": "#6E99FA" }, "chatbot_icons": { "chatbot_avatar": "resources/Assets/searchunify_bot.svg", "chatbot_close_icon": "resources/Assets/close_preview.svg", "chatbot_icon": "resources/Assets/bot_msg.svg" }, "font": { "font_style": "Montserrat", "hyperlink_color": "#6E99FA" }, "theme": "light", "title": { "board_color": "#6E99FA", "text_color": "#FFFFFF" }, "type_message_area": { "board_color": "#FBFBFB", "button_color": "#C2C2C2", "text_color": "#999C9E" }, "agent_id": "5f65b59e7ff52cfc1a994415" }, "basic_conf_data": { "bot_title": "SearchUnify Bot", "bot_name": "Sara", "created_by": "bharat", "welcome_message": { "type": "response", "value": { "_id": "5f65b59f7ff52cfc1a994458", "data": { "responses": [{ "label": "Computer Starts but Screen Remains Blank", "response": "Blank_Screen", "response_type": "response" }, { "label": "Troubleshooting Your Wireless Network and Internet Connection", "response": "Troubleshoot_wifi", "response_type": "response" }], "title": "Hello I am Louis, Your virtual assistant and am here to help you resolve your problems. Please choose from the options given below:", "type": "options" }, "set_slots": true, "slot_value": "su_slot_Greetings" } }, "agent_id": "5f65b59e7ff52cfc1a994415" }, "session_id": "1600507224162479", "user_session_id": "juiDfdvSWyleWPqc-20200919090925" };
const chatbotType = 'lithium';

// const config = {
//     baseUrl: '<%= client_url %>',
//     apiPath: '<%= client_url %>/chatbot/api',
//     accessToken: 'b72cbbab2728563ec74e93aa3223a7dc',
//     uid: '<%= uid %>',
//     sessionId: getId(),
//     pform:chatbotType
// }
const config = {
    baseUrl: 'https://development.searchunify.com/',
    apiPath: 'https://development.searchunify.com/chatbot/api',
    accessToken: 'b72cbbab2728563ec74e93aa3223a7dc',
    uid: '266c1041-0c44-11eb-b849-0242ac120008',
    sessionId: getId(),
    pform: chatbotType
}
const App = (props) => {
    const [botStatus, setBotStatus] = useState(false);
    const [langStatus, setLanguage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [configData, setConfigData] = useState({});
    const [startover, setStartover] = useState(0);
    const [error, setError] = useState(false);
    const [classNameAdd, setclassName] = useState(false);
    const [agent, setAgnet] = useState({
        status: false,
        name: ''
    });
    const [sessionId, setSessionId] = useState(getId());
    const [token, setToken] = useState('');

    const getToken = async () => {
        let userinfo = LITHIUM.CommunityJsonObject.User;
        config.apiPath = window.su_community_chat_bot;
        const response = await fetch(`${config.apiPath}?flag=-1&email=${userinfo.emailRef}&id=${userinfo.id}`);
        const json = await response.json();
        setToken(json.message);
        initialiseChatClientLithium(json.message);
    }
    const closeAgent = () => {
        setAgnet({
            status: false,
            name: ''
        })
    }
    const liveAgentStatus = (agent) => {
        setAgnet(agent)
    }
    const initialiseChatClientLithium = async (authToken) => {
        try {
            config.authToken = authToken;
            setLoading(true);
            const response = await fetch(`${config.apiPath}?flag=1&uid=${config.uid}&authToken=${authToken}&sessionId=${config.sessionId}`);
            const json = await response.json();
            let resp = JSON.parse(window.atob(json.data));
            setConfigData(resp);
            setLoading(false);

        } catch (error) {
            setConfigData(defaultConfig);
            setError(true);
        }
    }

    const initialiseChatClient = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.apiPath}/chat_client_conf?accessToken=${config.accessToken}&uid=${config.uid}&pform=web&sessionId=${config.sessionId}`);
            const json = await response.json();
            let resp = JSON.parse(window.atob(json.data));
            setConfigData(resp);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setConfigData(defaultConfig);
            setError(true);
        }
    }
    const changeStatus = () => {
        setLoading(true);
        setBotStatus(!botStatus);
        setclassName(!classNameAdd);
        setTimeout(() => {
            setclassName(false);
            setLoading(false);
        }, 500);


    }
    useEffect(() => {
        setLoading(true)
        setclassName(false)
        if (chatbotType == 'lithium') {
            getToken()
        } else {
            initialiseChatClient();
        }

    }, [startover]);

    return (

        <ThemeProvider theme={{}}>

            <div id="searchUnifyChat">
                <div className="container">
                    <div className="row">
                        <div className="wrapper">
                            {
                                botStatus
                                    ?
                                    <ParentDiv configData={configData} error={error} className={`show-profile ${classNameAdd ? 'enter-chat-to' : ''}`}>
                                        <div id="live-chat" >
                                            <MainDiv>
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    {error ?

                                                        <div className="row">
                                                            <Error configData={configData} closeCall={() => setBotStatus(!botStatus)} config={config} loading={loading} />
                                                            <ErrorConversation configData={configData} config={config} loading={loading} />

                                                        </div>
                                                        :
                                                        <div className="row">
                                                            {!loading ?
                                                                <div>
                                                                    <Header closeCall={() => setBotStatus(!botStatus)} closeAgent={() => closeAgent()} agentInfo={agent} config={config} sessionId={sessionId} configData={configData} loading={loading} openLang={() => setLanguage(!langStatus)} />
                                                                    <Conversation startover={() => setStartover(startover + 1)} liveAgent={(agent) => liveAgentStatus(agent)} agentInfo={agent} sessionId={sessionId} configData={configData.basic_conf_data} loading={loading} themeData={configData} config={config} loading={loading} langStatus={langStatus} closeLang={() => setLanguage(!langStatus)} />
                                                                </div>
                                                                :

                                                                <div>
                                                                    <Loading className="col-md-8 col-sm-6 col-xs-6" id="loading">
                                                                        <div>
                                                                            <div className="logo-bot"></div>
                                                                            <span className="loading-chat"> </span>
                                                                        </div>
                                                                    </Loading>
                                                                    <div className="border-chat">
                                                                        <SecondSection className="col-md-12 col-sm-12 col-xs-12">
                                                                            <ChatSection load>
                                                                                <ul>
                                                                                    <div className="chat">
                                                                                        <div>
                                                                                            <img id="load-img" src={config.baseUrl + '/resources/Assets/loading-new.svg'} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <LoadingList>
                                                                                        <div className="load-msg">
                                                                                            <li>
                                                                                                <div className="left-chat">  <div className="party"></div> </div>
                                                                                                <div className="left-chat">  <div className="party"></div> </div>
                                                                                            </li>
                                                                                        </div>
                                                                                        <div className="load-msg">
                                                                                            <li>
                                                                                                <div className="right-chat"> <p className="response"></p>  </div>
                                                                                                <div className="right-chat">   <p className="response"></p></div>
                                                                                            </li>
                                                                                        </div>
                                                                                        <div className="load-msg">
                                                                                            <li>
                                                                                                <div className="left-chat"> <div className="party"></div> </div>
                                                                                                <div className="left-chat"> <div className="party"></div> </div>
                                                                                            </li>
                                                                                        </div>
                                                                                        <div className="load-msg">
                                                                                            <li>
                                                                                                <div className="right-chat"> <p className="response"></p> </div>
                                                                                                <div className="right-chat"> <p className="response"></p> </div>
                                                                                            </li>
                                                                                        </div>
                                                                                    </LoadingList>
                                                                                </ul>
                                                                            </ChatSection>
                                                                            <StartOver start="true">
                                                                                <a>
                                                                                    <span>
                                                                                        <StartImage config={config} sessionId={sessionId} configData={configData} startimg />
                                                                                    </span>
                                                                                    Start over Conversation
                                                                                </a>
                                                                            </StartOver>
                                                                        </SecondSection>
                                                                    </div>
                                                                </div>
                                                            }

                                                        </div>
                                                    }
                                                </div>
                                            </MainDiv>
                                        </div>
                                    </ParentDiv>
                                    : ''
                            }
                            <ButtonEnd config={config} className="buttom-btn btn-end" onClick={() => changeStatus()} >
                                <div className="startChat"></div>
                            </ButtonEnd>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
