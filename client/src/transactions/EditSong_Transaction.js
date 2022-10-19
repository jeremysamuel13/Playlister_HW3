import jsTPS_Transaction from "../common/jsTPS.js"
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, id, song) {
        super();
        this.store = store;
        this.id = id
        this.song = song
    }

    doTransaction() {
        let oldSong = this.store.currentList.songs.find(el => el._id.toString() === this.id);
        this.oldSongState = { title: oldSong.title, artist: oldSong.artist, youTubeId: oldSong.youTubeId }
        console.log(this.oldSongState)
        this.store.editSong(this.id, this.song)
    }

    undoTransaction() {
        if (this.oldSongState) {
            console.log(this.oldSongState)
            this.store.editSong(this.id, this.oldSongState)
        }
    }
}