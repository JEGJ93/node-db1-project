const express = require('express');

const db = require("../dbConfig.js");

const router = express.Router();

router.get('/', async (req, res) => {
    // const posts = await db('posts');
    // const sql = db('posts').toString();
    // console.log(sql);
    // db('posts')
    // .then(posts => {
    //     res.json(posts);
    // })
    // .catch(err => {
    //     res.status(500).json({message: 'error getting posts', error:err});
    // })
    try {
        const accounts = await db('accounts');
        res.json(accounts);
    } catch (err) {
        res.status(500).json({message: 'error getting accounts', error:err});
    }
});


router.post('/', async (req, res) => {
    const newAccount = req.body;
    try {
        const sql = await db('accounts').insert(newAccount).toString();
        console.log(sql)

        console.log(newAccount);
        const account = await db('accounts').insert(newAccount)
        res.status(201).json(account);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'error inserting an account', error: err})

    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    try {
        const count = await db('accounts').update(changes).where({id});

        if (count) {
            res.json({updated: count});

        }
    } catch (err) {
        res.status(500).json({message: 'error udating account', error: err})
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const count = await db('accounts').where({id}).del();

        if (count) {
            res.json({deleted: count});
        } else {
            res.status(404).json({message: 'invalid id for account'})
        }
    } catch (err) {
        res.status(500).json({message: 'error deleting account', error: err})
    }
});


















module.exports = router;