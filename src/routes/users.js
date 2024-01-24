const router = require('express').Router();
const { users } = require('../controllers');

//mengeluarkan semua daftar penulis
router.get('/', users.getUser);

//menambah daftar penulis
router.post('/', users.addUser);

//show data berdasarkan parameter 'id'
router.get('/:id', users.getUserById);

//mengedit data berdasarkan parameter 'id'
router.put('/edit/:id', users.editUser);

//menghapus data berdasarkan parameter 'id'
router.delete('/delete/:id', users.deleteUser);

module.exports = router;