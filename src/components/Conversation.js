import React, { useEffect, useState, Fragment } from 'react';
import { withTheme } from 'styled-components';
import Message from './Message';
import UserInput from '../primitives/UserInput';
import Startover from './Startover';
import MainDiv from '../primitives/Main-div';
import BackImage from  '../primitives/BackImage';
import SkipImage from '../primitives/SkipImage';
import SecondSection from '../primitives/SecondSection';
import ChatSection from '../primitives/ChatSection';
import ThirdSection from '../primitives/ThirdSection';
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import LanguageSection from '../primitives/LanguageSection';
import Grid from '@material-ui/core/Grid';
import zChat from '../vendor/web-sdk';
var agentCount = 0;
var input = '';
var mlist;
var month_name = function (dt) {
    mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return mlist[dt.getMonth()];
};

const Conversation = (props) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [isLiveAgnet, setIsLiveAgnet] = useState(false);
    const [messages, setMessages] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [required, setRequired] = useState("false");
    const [form, setForm] = useState("false");
    const [cursor, setCursor] = useState(false);
    const [skipImg, setskipImg] = useState(false);
    const [currenLanguage, setCurrentLanguage] = useState('en');
    const [placeholder, setPlaceholder] = useState('Start a Conversation');
    const [typing, setTyping] = useState(false);
    const inputRef = React.createRef();
    // const [input, setInput] = useState('');
    const { loading, configData, themeData, config, langStatus,sessionId, agentInfo } = props;
    if(agentInfo.status == false){
        if (zChat.getConnectionStatus() != null && zChat.getConnectionStatus().toLowerCase() == 'connected') {
            let clearDeptId = {
                clear_dept_id_on_chat_ended: true
            };
            zChat.endChat(clearDeptId, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            zChat.logout(); 
        }
    }
    const startover = () => {
        props.startover();
    }
    const setLiveAgent =(status,name)=>{
       let data = {
            status: status,
            name : name
        }
        props.liveAgent(data);
    }
    const scrollDown = () =>{
        scrollToBottom(
            document.querySelector('.chat-section'),
            document.querySelector('.chat-section').scrollHeight,
            500
        )
           
    }

    const closeLang = () => {
        props.closeLang();
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCursor(true);
        handleClickInput(date);
    };
    const getZendeskKey = async ()=>{
        let url =  config.baseUrl+'/chatbot/api/adapter_settings?type=ZENDESK&accessToken=b72cbbab2728563ec74e93aa3223a7dc&pform=web&uid='+config.uid+'&sessionId=' + config.sessionId + '&user_session_id=' + themeData.user_session_id;
        let response = await fetch(url);
        let cryptedData = await response.text();
        let resp = atob(cryptedData);
        let responseData = JSON.parse(resp);
        return  JSON.parse(responseData.response);

    }
    const getHistory = async ()=>{
        let chatHistory =  config.baseUrl+'/chatbot/api/chat_history_sfdc?accessToken=b72cbbab2728563ec74e93aa3223a7dc&pform=web&uid='+config.uid+'&sessionId=' + config.sessionId + '&user_session_id=' + themeData.user_session_id;
        let response = await fetch(chatHistory);
        if(response.ok){
            let cryptedData = await response.text();
            let resp = atob(cryptedData);
            let responseData = JSON.parse(resp);
            return JSON.parse(responseData.response);
        }else{
            return false;
        }
       
    }
    const addLine = (text = Null) => {
        if (text) {
            let nodelist = document.querySelectorAll(".chat-section li:last-child");
            let lastnode = nodelist[nodelist.length - 1];
            if (lastnode) {
                lastnode.insertAdjacentHTML("afterend", "<div class='hr'><span class='hr-title'>" + text + "</span></div>");
            }
        }
    }
 
    const TextFieldComponent = (props) => {
        return <TextField {...props} disabled={true} />
    }
    const handleMonthChange = (date) => {
        // setCursor(true);
        setSelectedMonth(date);
        handleClickInput(date);
    };
    const handleYearChange = (date) => {
        // setCursor(true);
        setSelectedYear(date);
        handleClickInput(date);
    };
    const handleSelectedResponse= (data) => {
        setCursor(true);
        setskipImg(false);
        setTyping(true);
        setMessages(
            message => [...message, {
                type: 'USER',
                value: data.label
            }]
        );
        if(data.value == 'zendesk_live_agent'){
            setCursor(false);
            setIsLiveAgnet(true);
            let data = getZendeskKey();
            zChat.init({
                account_key:  'QxA29PugEITRhO1dnwwU7gRNFzNkOMRr', 
                suppress_console_error: true
            }); 
            
            
            let historyData = getHistory()
            if(historyData==false){
                historyData = 'data';
            }
            zChat.sendChatMsg('historyData.data', function (err) {
                if (err) {
                    console.log(err)
                }
            });
             
            zChat.on('chat', function (detail) {
                if (detail.type === 'chat.memberleave') {
                    addLine('End Chat');
                    setIsLiveAgnet(false);
                    setLiveAgent(false,'');
                }
                if (detail.type === 'chat.memberjoin') {
                    agentCount = agentCount + 1;
                    if(agentCount == 2){
                        if(detail.display_name != ''){
                            setLiveAgent(true,detail.display_name);
                            let name = detail.display_name.charAt(0).toUpperCase() + detail.display_name.slice(1);
                            addLine('Connected ' + name);
                        }
                    }
                }
                if (detail.type === 'chat.msg') {
                    let response = {
                        type : 'text',
                        value : detail.msg
                    }
                   setTyping(false);
                   scrollDown();
                   setMessages(message => [...message, response]);
                }
            });

            return false;
        }
        let response = {
            type : 'text',
            value : data.value
        }
       setMessages(message => [...message, response]);
       setCursor(false);
       setTyping(false);
       scrollDown(); 
    }
    const handleButtonSelect = (data) => {
        if(!isLiveAgnet){
            setCursor(true);
        }  
        setTyping(true);
        setskipImg(false);
        setMessages(
            message => [...message, {
                type: 'USER',
                value: data.label
            }]
        );

        setPlaceholder(themeData.basic_conf_data.bot_name + ' is typing...');
        if(config.pform == 'lithium'){
           let url = `${config.apiPath}?sessionId=${sessionId}&flag=2&query=${data.url}&uid=${config.uid}&authToken=${config.authToken}&user_session_id=${themeData.user_session_id}&form=${form}&lang=${currenLanguage}`;
            fetch(url).then(response => response.text()) .then(function (response) {
            var responses_data = JSON.parse(window.atob(response.replace(/[\r\n]+/gm, "").replace(/&quot;/g, '"')));
            var responses = JSON.parse(responses_data.response);
                // let responses = JSON.parse(JSON.parse(window.atob(response)).response);
            var respData = JSON.parse(responses[0]);
            // let responses = JSON.parse(JSON.parse(window.atob(response)).response);
            // let respData = JSON.parse(responses[0]);
            setResponseData(respData)
            setForm(respData.form);
            if (respData && (respData.entity == "date" || respData.entity == "date.month" || respData.entity == "date.year")) {
                setCursor(true);
            }else{
                setCursor(false);
            }
            scrollDown();
            responses.map((response) => setMessages(message => [...message, response]));
                setTyping(false);
                // setCursor(false);
                if(respData.confirm != 'true'){
                    setskipImg(true);
                }
                setPlaceholder('Start a Conversation');
           
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        }else{
            let url = config.baseUrl + '/chatbot/api/response';
            let opts = {
                accessToken: config.accessToken,
                pform: "web",
                query: data.url,
                sessionId: sessionId,
                uid: config.uid,
                user_session_id: themeData.user_session_id,
                form: form,
                lang:currenLanguage
            }    
            fetch(url, {
                method : 'post',
                body: JSON.stringify(opts)
            }).then(response => response.text())
                .then(function (response) {
                    let responses = JSON.parse(JSON.parse(window.atob(response)).response);
                    let respData = JSON.parse(responses[0]);
                    setResponseData(respData)

                    setForm(respData.form);

                    if (respData && (respData.entity == "date" || respData.entity == "date.month" || respData.entity == "date.year")) {
                        setCursor(true);
                    }else{
                        setCursor(false);
                    }
                    scrollDown();
                    responses.map((response) => setMessages(message => [...message, response]));
                        setTyping(false);
                        // setCursor(false);
                        if(respData.confirm != 'true'){
                            setskipImg(true);
                        }
                        setPlaceholder('Start a Conversation');
                   
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    const handleUserInput = (e) => {
        if (e.key == 'Enter') {
            if(!isLiveAgnet){
                setCursor(true);
            }    
            if (responseData && (responseData.entity == "date" || responseData.entity == "date.year" || responseData.entity == "date.month")) {
                input = selectedDate
           }
           else {
               input = e.target.value;
           }
            if(input == ''){
                return;
            }

            if(!input.replace(/\s/g, '').length && (required == undefined || required == "true" || required == "false")){
                setCursor(false);
                setskipImg(true);
                return;
            }
            setTyping(true);
            setskipImg(false);
           
            setMessages(
                message => [...message, {
                    type: 'USER',
                    value: input
                }]
            );
            setPlaceholder(themeData.basic_conf_data.bot_name + ' is typing...');
            document.getElementById("submit").readOnly = true;
            //call api 
            let opts = {
                accessToken: config.accessToken,
                pform: "web",
                query: input,
                sessionId: sessionId,
                uid: config.uid,
                user_session_id: themeData.user_session_id,
                form: form,
                lang: currenLanguage

            }
            if(isLiveAgnet){
                scrollDown();
                zChat.sendChatMsg(input, function (err) {
                    if (err) {
                        console.log(err)
                    }
                });
            }else{
                if(config.pform == 'lithium'){
                    let url = `${config.apiPath}?sessionId=${sessionId}&flag=2&query=${input}&uid=${config.uid}&authToken=${config.authToken}&user_session_id=${themeData.user_session_id}&form=${form}&lang=${currenLanguage}`;
                    fetch(url)
                        .then(response => response.text())
                        .then(function (response) {
                            var responses_data = JSON.parse(window.atob(response.replace(/[\r\n]+/gm, "").replace(/&quot;/g, '"')));
                            var responses = JSON.parse(responses_data.response);
                            // let responses = JSON.parse(JSON.parse(window.atob(response)).response);
                            var respData = JSON.parse(responses[0]);
                            // let responses = JSON.parse(JSON.parse(window.atob(response)).response);
                            // let respData = JSON.parse(responses[0]);
                            setResponseData(respData);
                            setForm(respData.form);
                            if (respData && (respData.entity == "date" || respData.entity == "date.month" || respData.entity == "date.year")) {
                                setCursor(true);
                            }else{
                                setCursor(false);
                            }
                            scrollDown();
                            responses.map((response) => setMessages(message => [...message, response]))             
                            setTyping(false);
                            if(respData.confirm != 'true'){
                               setskipImg(true);
                            }
                            
                            setPlaceholder('Start a Conversation');
                            
                            if(document.getElementById('submit')){
                                document.getElementById("submit").readOnly = false;
                                document.getElementById('submit').value = '';
                            }
                            input = '';
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }else{

                    fetch(config.baseUrl + '/chatbot/api/response', {
                        method: 'post',
                        body: JSON.stringify(opts)
                    })
                        .then(response => response.text())
                        .then(function (response) {
                            let responses = JSON.parse(JSON.parse(window.atob(response)).response);
                            let respData = JSON.parse(responses[0]);
                            setResponseData(respData);
                            setForm(respData.form);
                            if (respData && (respData.entity == "date" || respData.entity == "date.month" || respData.entity == "date.year")) {
                                setCursor(true);
                            }else{
                                setCursor(false);
                            }
                            scrollDown();
                            responses.map((response) => setMessages(message => [...message, response]))             
                            setTyping(false);
                            if(respData.confirm != 'true'){
                               setskipImg(true);
                            }
                            
                            setPlaceholder('Start a Conversation');
                            if(document.getElementById('submit')){
                                document.getElementById("submit").readOnly = false;
                                document.getElementById('submit').value = '';
                            }
                            
                            input = '';
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }         

               
            }   
            
        }
    }
    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    const handleClickInput = (e, skipbutton) => {
        setTyping(true);
        if(!isLiveAgnet){
            setCursor(true);
        }  
        setskipImg(false);
        if (skipbutton == undefined) {
            skipbutton = false;
        }
        if (responseData && (responseData.entity == "date.month")) {
            if (isNaN(Date.parse(e))) {
                input = '';
            }
            else {
                input = month_name(e);
            }
        }
        else if (responseData && (responseData.entity == "date")) {
            input = convert(e);

        }
        else if (responseData && (responseData.entity == "date.year")) {
            if (isNaN(Date.parse(e))) {
                input = '';
            }
            else {
                var date = new Date(e);
                input = JSON.stringify(date.getFullYear());
            }

        }

        if (skipbutton == true) {
            input = '';
        }
        if (skipbutton == false && input == '') {
            setCursor(false)
            setskipImg(true);
            setTyping(false);
            return ;
        }
        if (!input.replace(/\s/g, '').length && skipbutton == false && (required == undefined || required == "true" || required == "false")) {
            setCursor(false);
            setskipImg(true);
            setTyping(false);
            return ;
        }


        setMessages(
            message => [...message, {
                type: 'USER',
                value: input
            }]
        );
        setTyping(true);
        setPlaceholder(themeData.basic_conf_data.bot_name + ' is typing...');
        if(document.getElementById("submit")){
            document.getElementById("submit").readOnly = true;
        }
        
        let opts = {
            accessToken: config.accessToken,
            pform: "web",
            query: input,
            sessionId: sessionId,
            uid: config.uid,
            user_session_id: themeData.user_session_id,
            form: form,
            lang: currenLanguage

        }
        if(isLiveAgnet){
            scrollDown();
            
            zChat.sendChatMsg(input, function (err) {
                if (err) {
                    console.log(err)
                }
            });
        }else{
            if(config.pform == 'lithium'){
                // input = encodeURIComponent(input);
                let url = `${config.apiPath}?sessionId=${sessionId}&flag=2&uid=${config.uid}&authToken=${config.authToken}&user_session_id=${themeData.user_session_id}&form=${form}&lang=${currenLanguage}&query=${input}`;
                // if(input.includes("#")){
                //     input = input.replace(/#/g,"&#35;")
                // }
                fetch(url).then(
                    
                    response => response.text())
                    .then(function (response) {
                        var responses_data = JSON.parse(window.atob(response.replace(/[\r\n]+/gm, "").replace(/&quot;/g, '"')));
                        var responses = JSON.parse(responses_data.response);
                            // let responses = JSON.parse(JSON.parse(window.atob(response)).response);
                        var respData = JSON.parse(responses[0]);

                        setResponseData(respData);
                        if (responseData.type == 'text') {
                            if (typeof responseData.response.responses != 'undefined') {
                                responseData.response.responses = responseData.response.responses[0];
                            } else {
                                responseData.response = responseData.response[0];
                            }
                        }
                        setForm(respData.form);
                        setRequired(respData.required);
                        if (respData && (respData.entity == "date" || respData.entity == "date.month" || respData.entity == "date.year")) {
                            setCursor(true);
                        }else{
                            setCursor(false);
                        }
                        scrollDown()
                        setTimeout(() => {
                            responses.map((response) => setMessages(message => [...message, response]))               
                          }, 100);
                          setTyping(false)
                          setPlaceholder('Start a Conversation');
                          if(responseData.confirm != 'true'){
                                setskipImg(true);
                          }
                          
                        if(document.getElementById("submit")){
                            document.getElementById("submit").readOnly = false;
                            document.getElementById('submit').value = '';
                        }
                       
                        input = '';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }else{
                fetch(config.baseUrl + '/chatbot/api/response', {
                    method: 'post',
                    body: JSON.stringify(opts)
                }).then(response => response.text())
                    .then(function (response) {
                        
                        let responses = JSON.parse(JSON.parse(window.atob(response)).response);
                        let respData = JSON.parse(responses[0]);
                        console.log(atob(responses_data))
                        setResponseData(respData);
                        if (responseData.type == 'text') {
                            if (typeof responseData.response.responses != 'undefined') {
                                responseData.response.responses = responseData.response.responses[0];
                            } else {
                                responseData.response = responseData.response[0];
                            }
                        }
                        setForm(respData.form);
                        setRequired(respData.required);
                        if (respData && (respData.entity == "date" || respData.entity == "date.month" || respData.entity == "date.year")) {
                            setCursor(true);
                        }else{
                            setCursor(false);
                        }
                        scrollDown()
                        setTimeout(() => {
                            responses.map((response) => setMessages(message => [...message, response]))               
                          }, 100);
                          setTyping(false)
                          setPlaceholder('Start a Conversation');
                          if(responseData.confirm != 'true'){
                                setskipImg(true);
                          }
                        if(document.getElementById('submit')){
                            document.getElementById("submit").readOnly = false;
                            document.getElementById('submit').value = '';
                        }
                        input = '';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }    
            
        }
    }
    function scrollToBottom(element, to, duration) {
        if (duration < 0) return
        var scrollTop = element.scrollTop
        var difference = to - scrollTop
        var perTick = (difference / duration) * 10

        setTimeout(function () {
            scrollTop = scrollTop + perTick
            element.scrollTop = scrollTop
            if (scrollTop === to) return
            scrollToBottom(element, to, duration - 10)
        }, 10)
    }
    const saveEvent = (e) => {
        input = e.target.value;
    }
    const changeLang = (e) => {
        setCurrentLanguage(e.target.value);
        if(form == "true"){
            setForm("false");
        }
        

    }
    const getLanguages = async () => {
        try { 
            if(config.pform == 'lithium'){
                let response = await fetch(`${config.apiPath}?uid=${config.uid}&flag=3&pform=web&accessToken=${config.accessToken}`);
                const json = await response.text();
                // let resp = JSON.parse(window.atob(json));
                let resp = JSON.parse(window.atob(json.replace(/[\r\n]+/gm, "").replace(/&quot;/g, '"')));
                let result = JSON.parse(resp.response);
                setLanguages(result.data.languages_support)
            }else{
                let response = await fetch(`${config.apiPath}/languages?uid=${config.uid}`);
                const json = await response.text();
                let resp = JSON.parse(window.atob(json));
                let result = JSON.parse(resp.response);
                setLanguages(result.data.languages_support)
            }            
          
        } catch (error) {
           console.log('error',error);
        }
    }
    useEffect(() => {
        getLanguages();
        setMessages(message => [...message, configData.welcome_message])
        setPlaceholder('Start a Conversation');
    }, [])

    return (
        <div >
            <MainDiv>
                <SecondSection className="col-md-12 col-sm-12 col-xs-12">
                    <ChatSection themeData={themeData} className="chat-section">
                        <ul>
                            {messages.map((message, index) =>
                                <Message onButtonSelect={handleButtonSelect}  onResponseSelect={handleSelectedResponse} key={index} currentLang={currenLanguage} message={message} config={config} themeData={themeData} typing={typing} />
                            )}
                        </ul>
                        {typing ?
                            <div>
                                <img id="load-img" src={config.baseUrl+'/resources/Assets/loading-new.svg'} />
                            </div> : null
                        }


                    </ChatSection>
                    <Startover startover={startover} themeData={themeData} config={config} />
                </SecondSection>

            </MainDiv>
            <MainDiv chatting>
                <ThirdSection className="col-md-12 col-sm-12 col-xs-12" id="third-section" themeData={themeData}>
                    <div  className={ cursor ? 'disable disable-text text-bar' : 'text-bar'}>
                        {responseData && responseData.entity == "date" ?
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container>
                                    <KeyboardDatePicker
                                        disabled = {typing}
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy-MM-dd"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Select Date"
                                        onChange={handleDateChange}
                                        autoOk={true}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        TextFieldComponent={TextFieldComponent}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            : responseData && responseData.entity == "date.month" ?
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        disableToolbar
                                        disabled = {typing}
                                        variant="inline"
                                        openTo="month"
                                        views={["month"]}
                                        label="Month only"
                                        onChange={handleMonthChange}
                                        autoOk={true}
                                        TextFieldComponent={TextFieldComponent}
                                    />
                                </MuiPickersUtilsProvider>
                                : responseData && responseData.entity == "date.year" ?
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            disableToolbar
                                            disabled = {typing}
                                            variant="inline"
                                            views={["year"]}
                                            label="Year only"
                                            onChange={handleYearChange}
                                            autoOk={true}
                                            TextFieldComponent={TextFieldComponent}
                                        />
                                    </MuiPickersUtilsProvider> :
                                    <UserInput id="submit" className={ cursor ? 'disable' : null} ref={inputRef} onKeyDown={e => handleUserInput(e)} placeholder= {placeholder} themeData={themeData} onChange={e => saveEvent(e)} />
                        }
                        {
                        (responseData.required != undefined && responseData.required == "false" && responseData.form=="true" && skipImg) ? 
                        <span>
                            <SkipImage id="skip-img" height="18px" width="18px" themeData={themeData} config={config} skip onClick={e => handleClickInput(e, true)} /> 
                        </span> 
                        : ''
                        }
                        {
                            cursor ?

                                <a style={{cursor: "not-allowed"}} pointerEvents="none">
                                    <svg className="type-area" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M3.4,20.4l17.45-7.48a1,1,0,0,0,0-1.84L3.4,3.6a.993.993,0,0,0-1.39.91L2,9.12a.994.994,0,0,0,.87.99L17,12,2.87,13.88a1.012,1.012,0,0,0-.87,1l.01,4.61A.993.993,0,0,0,3.4,20.4Z"></path>
                                    </svg>
                                </a> :
                                <a  onClick={handleClickInput} pointerEvents="auto">
                                    <svg className="type-area" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M3.4,20.4l17.45-7.48a1,1,0,0,0,0-1.84L3.4,3.6a.993.993,0,0,0-1.39.91L2,9.12a.994.994,0,0,0,.87.99L17,12,2.87,13.88a1.012,1.012,0,0,0-.87,1l.01,4.61A.993.993,0,0,0,3.4,20.4Z"></path>
                                    </svg>
                                </a>}

                    </div>
                </ThirdSection>

                <LanguageSection>
                {langStatus ?
                    <div className="settings-new">
                        <div>
                            <div className="top-bar">
                                <span className="lang-logo" onClick={closeLang}> 
                                {/* <Image config={config} configData={configData} height="24px" width="24px" back /> */}
                                <BackImage config={config} height= "24px" width = "24px"/></span>
                                <p className="lang-heading">Settings</p>
                            </div>

                            <div className="pad-top">
                                <label>Languages</label>
                                <form>
                                    <select id="mySelect" value={currenLanguage} onChange={e => changeLang(e)} >
                                        {languages.map((language, index) =>
                                            <option key={index} className="select-option"  value={language.lang}>{language.language_name}</option> 
                                        )}
                                    </select>
                                    <div className="Select__icon-container"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="white" height="20" className="Select__chevron"><title>close</title><path d="M33.408 43.43a2 2 0 0 1-2.83 0L15.575 28.418a2 2 0 1 1 2.83-2.83l13.59 13.597 13.59-13.597a2.001 2.001 0 1 1 2.828 2.83z" fillRule="evenodd"></path></svg></div>
                                </form>
                            </div>

                        </div>

                    </div> : null
                    }
                </LanguageSection>
                <div className="col-md-12 col-sm-12 col-xs-12 third-section textLoad" id="loading"></div>
            </MainDiv>
        </div>
    )

}

export default withTheme(Conversation);
