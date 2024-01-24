const config = require('../config/database');
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.connect();
const { User } = require("../models");

// menampilkan semua data
const getUser = async (req, res) => {
    const data = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users", function (error, rows) {
            if (rows) {
                resolve(rows);
            } else {
                reject([]);
            }
        });
    });

    if (data) {
        res.send({
            success: true,
            message: "berhasil",
            data: data
        });
    } else {
        res.send({
            success: false,
            message: "gagal",
        });
    }
}

const getDataUserById = async (req, res) => {
    let id = req.params.id;
    const dataUser = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE id = ?";
        connection.query(query, [id], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });

    if (dataUser.length > 0) {
        const dataUser = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM buku WHERE id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.send({
            success: true,
            message: "Berhasil",
            dataPenulis: dataPenulis[0], // Ambil data penulis dari array hasil query
            dataBuku: dataBuku
        });
    } else {
        res.send({
            success: false,
            message: "Data penulis tidak ditemukan",
        });
    }
}


const addDataPenulis = async (req, res) => {
    let data = {
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        alamat: req.body.alamat
    }
    const result = await new Promise((resolve, reject) => {
        const query = 'INSERT INTO penulis SET ?';
        connection.query(query, [data], function (err, rows) {
            if (rows) {
                resolve(rows);
            } else {
                reject([]);
            }
        });
    });

    if (result) {
        res.send({
            success: true,
            message: "berhasil menambah data",
        });
    } else {
        res.send({
            success: false,
            message: "gagal menambah data",
        });
    }
}

const editDataPenulis = async (req, res) => {
    let id = req.params.id;
    let data = {
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        alamat: req.body.alamat
    }
    const result = await new Promise((resolve, reject) => {
        const query = 'UPDATE penulis SET ? where id = ?';
        connection.query(query, [data, id], function (err, rows) {
            if (rows) {
                resolve(rows);
            } else {
                reject([]);
            }
        });
    });

    if (result) {
        res.send({
            success: true,
            message: "berhasil edit data",
        });
    } else {
        res.send({
            success: false,
            message: "gagal edit data",
        });
    }
}

const deleteDataPenulis = async (req, res) => {
    let id = req.params.id;

    const result = await new Promise((resolve, reject) => {
        const query = 'DELETE FROM penulis where id = ?';
        connection.query(query, [id], function (err, rows) {
            if (rows) {
                resolve(rows);
            } else {
                reject([]);
            }
        });
    });

    if (result) {
        res.send({
            success: true,
            message: "berhasil hapus data",
        });
    } else {
        res.send({
            success: false,
            message: "gagal hapus data",
        });
    }
}


module.exports = {
    getDataPenulis,
    getDataPenulisById,
    addDataPenulis,
    editDataPenulis,
    deleteDataPenulis
}