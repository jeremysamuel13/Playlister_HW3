import jsTPS_Transaction from "../common/jsTPS.js"
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store, payload) {
        super();
        this.store = store;
        this.payload = payload
    }

    doTransaction() {
        this.song = this.store.addSong(this.payload)
    }

    undoTransaction() {
        this.store.removeSong(this.song._id)
    }
}