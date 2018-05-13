export class MessageBox {
    message: string;
    messageType: string;
    showMessage: boolean;

    constructor() {
        this.showMessage = false;
        this.messageType = '';
        this.message = '';
    }
}
