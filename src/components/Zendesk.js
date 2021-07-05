import { zChat } from "../vendor/web-sdk";

export class Zendesk {
    constructor() {
        this.init();
    }

    init(){
        console.log('call init');
    }

    start(){
        console.log('start');
        console.log(zChat);
    }
}



