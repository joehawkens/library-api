require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db');
const { ObjectId } = require('mongodb');
app.use(express.json());

/**GET ALL
 * @swagger
 * /books:
 *   get:
 *     description: Get all Books.
 *     responses:
 *       200:
 *         description: Success
 * 
 */

// GET All ===================================================================================================================
router.get('/', (req, res) => {
    
    
    db.getDB().collection('books').find({}).toArray()
    .then((books) => {
        res.send(books)
    });

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
 *       200:
 *         description: Success
 * 
 */

// POST ========================================================================================================================
router.post('/', (req, res) => {


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






module.exports = router;