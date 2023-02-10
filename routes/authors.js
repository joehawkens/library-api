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
*       500:
*         description: Failure
*/

// GET All ===================================================================================================================
router.get('/', (req, res) => {

        db.getDB().collection('authors').find({}).toArray()
        .then((authors) => {
            res.send(authors)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not get authors.'})
        })
        


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
*       400:
*         description: Bad Request
*       500:
*         description: Failure
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


/**PUT
* @swagger
* /authors/{id}:
*   put:
*     description: Update an existing author.
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
*       204:
*         description: Success
*       400:
*         description: Bad Request
*       500:
*         description: Failure
* 
*/

router.put('/:id', (req, res) => {
    
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)){
        db.getDB().collection('authors')
            .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
            .then(result => {
                res.status(204).json(result)
            })
            .catch(err => {
                res.status(500).json({error: "Could not update the document."})
            })
    } else {
        res.status(500).json({error: "Not a valid author id."})
    }
})


/**DELETE
* @swagger
* /authors/{id}:
*   delete:
*     description: Delete a contact by ID.
*     parameters:
*      - in: path
*        name: id
*        schema:
*            type: string
*        description: String id of user to delete.
*        required: true
*     responses:
*       200:
*         description: User was deleted.
*       400:
*         description: Bad Request
*       500:
*         description: Failure
* 
*/

// Delete ======================================================================================================================
router.delete('/:id', (req, res) => {
    
    if (ObjectId.isValid(req.params.id)){
        db.getDB().collection('authors')
            .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: "Could not delete the author."})
            })
    } else {
        res.status(500).json({error: "Not a valid doc id."})
    }


})



module.exports = router;