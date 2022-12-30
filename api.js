const { Router } = require('express');

const router = require ('express').Router();

const books = require('./books');

let booksDirectory = books;
router.get('/books', function(req, res){
    res.send(books);



});
router.get('/books/:id', function(req, res){

    const {id} = req.params;

    const author = books.find(b => b.id==3);
    if(!author) return res.status(404).send('book does nor exsist');
    res.send(author)
});
router.post('/books', function(req, res){

    const {
        id,
        name , 
        author

    }= req.body;
    const bookExist = books.find(b => b.id==id);
    if(bookExist) return res.send('book already exist');
    const book = {
   id,
   name, 
   author
    } ;
    books.push(book);
    res.send(book);

});
router.put('/books/:id', function(req, res){
    const { id } = req.params;
    const body = req.body;
    books.forEach((book, index) => {
      if (book.id === parseInt(id)) {
        books[index] = body;
      }
    });
    res.json({ message: `The book with ID ${id} has been updated` });
 res.json(books);

});
router.delete('/books/:id', function(req, res){

    const { id } = req.params;
  books.forEach((book, index) => {
    if (book.id === parseInt(id)) {
      books.splice(index);
    }
  });
  res.json({ message: `Book with id #${id} has been deleted` });
});





module.exports = router;