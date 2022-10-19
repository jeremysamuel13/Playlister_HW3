import jsTPS_Transaction from "../common/jsTPS.js"
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store, payload) {
        super();
        this.store = store;
        this.payload = payload
    }

    async doTransaction() {
        this.songID = await this.store.addSong(this.payload)
    }

    undoTransaction() {
        this.store.removeSongById(this.songID)
    }
}