import jsTPS_Transaction from "../common/jsTPS.js"
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, id) {
        super();
        this.store = store;
        this.id = id
    }

    async doTransaction() {
        this.song = await this.store.removeSongById(this.id)
    }

    async undoTransaction() {
        this.id = await this.store.addSong(this.song)
    }
}