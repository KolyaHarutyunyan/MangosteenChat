import {EventEmitter} from "../../modules/emitter";
import './field.css';
export {Field};

class Field extends EventEmitter {
    constructor({el}) {
        super();
        this.el = el;
        this.init();
    }

    init() {
        this.el.addEventListener(
            'submit',
            this.onSubmit.bind(this)
        );
    }

    onSubmit(evt) {
        evt.preventDefault();
        const getMsg = evt.target.querySelector('.chat-controls__textarea');
        this.msg = getMsg.innerHTML;
        const searchImg = this.msg.search('<img src="data');
        const searchDoc = this.msg.search('<img src="../assets/img/doc.png"');
            if (searchImg === -1 && searchDoc === -1) {
                this.msg = getMsg.textContent.trim();
            }
            if (this.msg !== '') {
                const event = new Event(Field.MSG_SEND_EVENT, {
                    bubbles: true
                });
                this.emit(event);
            }
        getMsg.innerHTML = '';
    }

    render() {
        this.el.classList.add('chat-controls');
        this.el.innerHTML = `
            <form>
                    <div contenteditable="true" class="chat-controls__textarea" placeholder="Type a message"></div>
                    <div class="chat-controls-buttons">
                        <input type="submit" value="Send" class="chat-controls-buttons__send">
                        <div class="spinner-loader__wrapper"></div>
                        <div class="chat-controls-buttons-wrapper">
                            <div class="chat-controls-buttons__smiles">
                                <img src="../assets/img/smile.png">
                                <div class="chat-controls-buttons__smiles-menu">
                                    <div class="chat-controls-buttons__smile" data-emoji>😑</div>
                                    <div class="chat-controls-buttons__smile" data-emoji>😕</div>
                                    <div class="chat-controls-buttons__smile" data-emoji>😊</div>
                                    <div class="chat-controls-buttons__smile" data-emoji>😎</div>
                                    <div class="chat-controls-buttons__smile" data-emoji>💪</div>
                                </div>
                            </div>
                            <input type="file" id="chat-controls-buttons__upload" multiple accept="file_extension">
                            <label class="chat-controls-buttons__attach" for="chat-controls-buttons__upload"><i class="fa fa-paperclip"></i></label>
                        </div>
                    </div>
            </form>
        `;
    }

    initEmoji() {
        const textArea = this.el.querySelector('.chat-controls__textarea');
        const emoji = this.el.querySelectorAll('[data-emoji]');
        for (let i = 0; i < emoji.length; i++) {
            emoji[i].addEventListener(
                'click',
                function () {
                    textArea.innerHTML += this.innerHTML;
                }
            )
        }
    }

    initFiles() {
        const textArea = this.el.querySelector('.chat-controls__textarea');
        const fileElem = this.el.querySelector('#chat-controls-buttons__upload');
        fileElem.addEventListener('change', handleFiles.bind(fileElem.files));

        function handleFiles(files) {
            files = [...files.target.files];
            files.forEach(previewFile);
        }

        function previewFile(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.classList.add('message__newImg');
                    textArea.appendChild(img);
                }
                else {
                    const doc = document.createElement('img');
                    doc.src = '../assets/img/doc.png';
                    doc.classList.add('message__newImg');
                    textArea.appendChild(doc);
                }
            }
        }
    }

    initSpinner() {
        const textArea = this.el.querySelector('.chat-controls__textarea');
        const spinner = this.el.querySelector('.spinner-loader__wrapper');
        textArea.addEventListener('keypress', keyPress);

        function keyPress() {
            spinner.classList.add('spinner-loader');
            setTimeout(keyUp, 3000);
        }

        function keyUp() {
            spinner.classList.remove('spinner-loader');
        }
    }
}

Field.MSG_SEND_EVENT = 'message:send';