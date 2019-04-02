const book = require('../models/book')

class bookCollection {

  static create(req, res) {
    book.create(req.body)
      .then((newBook) => {
        res.status(201).json(newBook)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static findAllBook(req, res) {
    let field = {}
    console.log(req.query)
    if (req.query.search) {
      field = {
        $or: [{
          title: {
            $regex: '.*' + req.query.search + '.*',
            $options: "i"
          }
        }, {
          author: {
            $regex: '.*' + req.query.search + '.*',
            $options: "i"
          }
        }]
      }
    } else if (req.query.title) {
      field = {
        title: {
          $regex: '.*' + req.query.title + '.*',
          $options: "i"
        }
      }
    } else if (req.query.author) {
      field = {
        author: {
          $regex: '.*' + req.query.author + '.*',
          $options: "i"
        }
      }
    }

    book.find(field)
      .then((books) => {
        res.status(201).json(books)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static findBook(req, res) {
    book.findById(req.params.id)
      .then((foundBook) => {
        res.status(201).json(foundBook)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static updateBook(req, res) {
    book.findByIdAndUpdate({
        _id: req.params.id
      }, {
        $set: req.body
      })
      .then(updatedBook => {
        res.status(200).json(updatedBook)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static deleteBook(req, res) {
    book.findByIdAndDelete({
        _id: req.params.id
      })
      .then((deleted) => {
        res.status(200).json(deleted)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}

module.exports = bookCollection