const transaction = require('../models/transactions')

class TranscationCollection{

  static create(req, res) {
    transaction.create(req.body)
      .then((newTransactio)=> {
        res.status(201).json(newTransactio)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static findAllTransaction(req, res) {
    transaction.find()
    .populate('member')
    .populate('bookList')
      .then((transactions)=> {
        if(!req.query.bookId) res.status(200).json(transactions)
        else {
          let book = []
          transactions.forEach( el => {
            el.bookList.forEach ( bookId => {
              if(bookId._id == req.query.bookId) book.push(el)
            })
          })

          res.status(200).json(book)
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static findTransaction(req, res) {
    transaction.findById(req.params.id)
      .then((foundTransaction)=> {
        res.status(201).json(foundTransaction)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static updateTransaction(req, res) {
    transaction.findOneAndUpdate({_id : req.params.id},{ $set : req.body})
      .then( updatedTrans => {
        res.status(200).json(updatedTrans)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static deleteTranscation(req, res) {
    transaction.findByIdAndDelete({_id : req.params.id})
      .then( (deleted)=> {
        res.status(200).json(deleted)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}

module.exports = TranscationCollection