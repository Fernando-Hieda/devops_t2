import express from 'express';
import { createPlaylist, updatePlaylist, retrievePlaylistsAndUsers, retrievePlaylistsByUserId } from '../persistence/playlistPersistence.js';

const router = express.Router();

// Save or update a playlist.
// If an id is provided, playlist is updated (id and user_id will not be updated).
// If no id is provided, playlist is created (new id will be generated).
router.put('/', async (req, res) => {
    try {
        if (req.body.id) {
            const updatedPlaylist = await removePlaylist(req.body);
            return res.json(updatedPlaylist);
        }
    } catch (err) {
        if (err.cause?.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(400).send('Playlist ' + req.body.id + ' does not exist');
        } else {
            console.log(err);
            res.status(500).send('Error removing playlist');
        }
    }
});

// Retrieve a user by user_id (provided via query param)
router.get('/', async (req, res) => {
    try {
        if (req.query.user_id) {
            const playlists = await retrievePlaylistsByUserId(req.query.user_id);
            return res.json(playlists);
        } else {
            const allPlaylists = await retrievePlaylistsAndUsers();
            return res.json(allPlaylists);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving playlists');
    }
});


export default router;