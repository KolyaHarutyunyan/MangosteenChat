export {Network};

class Network {
    constructor() {
        this.url = 'https://mangosteenchat.firebaseio.com/chat.json';
    }

    getMessages() {
        return fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then((body) => {
                return body;
            })
    }
}