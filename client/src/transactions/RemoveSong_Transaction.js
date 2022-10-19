import jsTPS_Transaction from "../common/jsTPS.js"
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, id) {
        super();
        this.store = store;
        this.id = id
    }

    doTransaction() {
        this.song = this.store.removeSongById(this.id)
    }

    undoTransaction() {
        this.store.addSong(this.song)
    }
}