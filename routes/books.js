require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db');
const { ObjectId } = require('mongodb');
app.use(express.json());


//VALIDATION
const { check, validationResult } = require('express-validator');

/**GET ALL
 * @swagger
 * /books:
 *   get:
 *     description: Get all Books.
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Failure
 * 
 */

// GET All ===================================================================================================================
router.get('/', (req, res) => {
    
    
    db.getDB().collection('books').find({}).toArray()
    .then((books) => {
        res.send(books)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not get all books.'})
    })

})


/**POST
 * @swagger
 * /books:
 *   post:
 *     description: Create a new book.
 *     parameters:
 *        - in: body
 *          name: user
 *          description: The book to create.
 *          schema:
 *              type: object
 *              required:
 *                - id: string
 *              properties:
 *                  title:
 *                      type: string
 *                  pageCount:
 *                      type: string
 *                  authorName:
 *                      type: string
 *                  averageRating:
 *                      type: string
 *                  datePublished:
 *                      type: string
 *                  isASeries:
 *                      type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failure
 * 
 */

// POST ========================================================================================================================
router.post('/', [
    check('title').notEmpty(),
    check('pageCount').notEmpty(),
    check('authorName').notEmpty(),
    check('averageRating').notEmpty(),
    check('datePublished').notEmpty(),
    check('isASeries').notEmpty()
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json('bad request' + {errors: errors.array()})
    }

    const book = req.body;

    db.getDB().collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create a new book.'})
        })
    


})


/**PUT
* @swagger
* /books/{id}:
*   put:
*     description: Update an existing book.
*     parameters:
*        - in: path
*          name: id
*          description: ID of the book.
*        - in: body
*          name: book
*          description: The book to create
*          schema:
*              type: object
*              required:
*                - id: string
*              properties:
*                  title:
*                      type: string
*                  pageCount:
*                      type: string
*                  authorName:
*                      type: string
*                  averageRating:
*                      type: string
*                  datePublished:
*                      type: string
*                  isASeries:
*                      type: string
*     responses:
*       204:
*         description: Success
*       400:
*         description: Bad Request
*       500:
*         description: Server Failure
* 
*/

router.put('/:id',[
    check('title').notEmpty(),
    check('pageCount').notEmpty(),
    check('authorName').notEmpty(),
    check('averageRating').notEmpty(),
    check('datePublished').notEmpty(),
    check('isASeries').notEmpty()
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json('bad request' + {errors: errors.array()})
    }
    
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)){
        db.getDB().collection('books')
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
 * /books/{id}:
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
router.delete('/:id',[
    check('id').isString()
], (req, res) => {
    
    if (ObjectId.isValid(req.params.id)){
        db.getDB().collection('books')
            .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: "Could not delete the book."})
            })
    } else {
        res.status(500).json({error: "Not a valid book id."})
    }


})



module.exports = router;