require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db');
const { ObjectId } = require('mongodb');
app.use(express.json());


/**GET ALL
* @swagger
* /authors:
*   get:
*     description: Get all Authors.
*     responses:
*       200:
*         description: Success
* 
*/

// GET All ===================================================================================================================
router.get('/', (req, res) => {
    
    
    db.getDB().collection('authors').find({}).toArray()
    .then((authors) => {
        res.send(authors)
    });

})



/**POST
* @swagger
* /authors:
*   post:
*     description: Create an existing author.
*     parameters:
*        - in: body
*          name: author
*          description: The author to create
*          schema:
*              type: object
*              required:
*                - id: string
*              properties:
*                  name:
*                      type: string
*                  booksPublished:
*                      type: string
*                  birthplace:
*                      type: string
*                  genre:
*                      type: string
*                  website:
*                      type: string
*                  portrait:
*                      type: string
*                  died:
*                      type: string
*     responses:
*       200:
*         description: Success
* 
*/

// POST ========================================================================================================================
router.post('/', (req, res) => {


    const author = req.body;

    db.getDB().collection('authors')
        .insertOne(author)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create a new author.'})
        })
    


})



module.exports = router;