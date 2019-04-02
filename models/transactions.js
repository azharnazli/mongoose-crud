const mongoose = require('mongoose')
const Schema = mongoose.Schema
const transactionSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  in_date: Date,
  out_date: Date,
  due_date: Date,
  fine: {
    type: Number,
    validate: {
      validator: function () {}
    }
  },
  bookList: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

function diffDays(d1, d2)
{
  var ndays;
  var tv1 = d1.valueOf();  // msec since 1970
  var tv2 = d2.valueOf();

  ndays = Math.abs(tv2 - tv1) / 1000 / 86400;
  ndays = Math.round(ndays - 0.5);
  ndays *= 1000
  return ndays;
}

transactionSchema.post('findOneAndUpdate', function (doc, next) {
  if(doc.in_date > doc.out_date) {
     doc.fine =  diffDays(doc.in_date, doc.out_date)
  }
  doc.save()
  next()
})

const transaction = mongoose.model('Transaction', transactionSchema)
module.exports = transaction