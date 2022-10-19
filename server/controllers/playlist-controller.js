const Playlist = require('../models/playlist-model')
const mongoose = require('mongoose')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

deletePlaylist = (req, res) => {
    Playlist.findByIdAndDelete(req.params.id, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            return res.status(200).json({ success: true, playlist })
        }
    })
}

updatePlaylistById = (req, res) => {
    const { body, params: { id } } = req;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body',
        })
    }

    Playlist.findByIdAndUpdate(id, body, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            return res.status(200).json({ success: true, playlist })
        }
    })
}

addSongToPlaylistById = (req, res) => {
    const { body, params: { id } } = req;
    console.log(req.body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a song as the body',
        })
    }

    const songId = new mongoose.Types.ObjectId()

    Playlist.findByIdAndUpdate(id, {
        $push: {
            songs: {
                _id: songId, artist: body.artist, title: body.title, youTubeId: body.youTubeId
            }
        }
    }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            return res.status(200).json({ success: true, playlist, _id: songId })
        }
    })
}

removeSongFromPlaylistById = async (req, res) => {
    const { playlistID, songID } = req.params;
    console.log(req.params)

    const playlist = await Playlist.findById(playlistID)
    const song = playlist.songs.find(el => el._id.toString() === songID)

    Playlist.findByIdAndUpdate(playlistID, { $pull: { songs: { _id: songID } } }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            return res.status(200).json({ success: true, playlist, song })
        }
    })
}

moveSong = async (req, res) => {
    const { playlistID } = req.params;
    const { from, to } = req.query

    const list = await Playlist.findById(playlistID)

    if (!list) {
        return res.status(400).json({ success: false, error: 'Playlist not found' })
    }

    if (!from || !to) {
        return res.status(400).json({ success: false, error: 'Invalid indices' })

    }

    let start = parseInt(from, 10)
    let end = parseInt(to, 10)

    console.log(list.songs)

    if (start < end) {
        let temp = list.songs[start];
        for (let i = start; i < end; i++) {
            list.songs.set(i, list.songs[i + 1])
        }
        list.songs.set(end, temp);
    }
    else if (start > end) {
        let temp = list.songs[start];
        for (let i = start; i > end; i--) {
            list.songs.set(i, list.songs[i - 1]);
        }
        list.songs.set(end, temp);
    }

    console.log(list.songs)

    await list.save()

    return res.status(200).json({ success: true, playlist: list })
}

editSongById = async (req, res) => {
    const { body, params: { playlistID, songID } } = req

    const playlist = await Playlist.findById(playlistID)


    if (!playlist) {
        return res.status(400).json({ success: false, error: 'Playlist not found' })
    }

    const idx = playlist.songs.findIndex(el => el._id.toString() === songID)

    console.log({ idx, body, songID })

    playlist.songs[idx] = { _id: playlist.songs[idx]._id, ...body }

    console.log(playlist)

    await playlist.save()

    return res.status(200).json({ success: true, playlist })

}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    deletePlaylist,
    updatePlaylistById,
    addSongToPlaylistById,
    removeSongFromPlaylistById,
    moveSong,
    editSongById
}