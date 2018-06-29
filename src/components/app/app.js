import {Chat} from "../chat/chat";
import {Field} from "../field/field";
import {Message} from "../message/message";
import {Messages} from "../messages/messages";
import {Spinner} from "../spinner/spinner";
import '../../../assets/reset/reset.min.css';
import '../../../assets/fonts/fonts.css';
import './app.css';

export class App {
    constructor({el, data}) {
        this.el = el;
        this.chat = new Chat({
            el: document.createElement('div')
        });
        this.field = new Field({
            el: document.createElement('div')
        });
        this.field.subscribe(Field.MSG_SEND_EVENT, () => {
            this.message.render();
            this.messages.el.append(
                this.message.el
            );
            this.message.scroll();
        });
        this.message = new Message({
            el: document.createElement('div'),
            msg: this.field
        });
        this.messages = new Messages({
            el: document.createElement('div'),
            data: {
                stack: data.stack
            }
        });
        this.spinner = new Spinner({
            el: document.createElement('div'),
            parent: this.field.el
        });
    }

    render() {
        this.chat.render();
        this.messages.render();
        this.field.render();
        this.spinner.render();
        this.el.append(
            this.chat.el
        );
        this.chat.el.append(
            this.messages.el,
            this.field.el
        );
    }

    init() {
        this.field.initEmoji();
        this.field.initFiles();
        this.spinner.init();
    }

    run() {
        this.render();
        this.init();
    }
}