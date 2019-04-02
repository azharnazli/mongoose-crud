const member = require('../models/member')

class memberCollection{

  static create(req, res) {
    member.create(req.body)
      .then((newMember)=> {
        res.status(201).json(newMember)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static findAllMember(req, res) {
    member.find()
      .then((members)=> {
        res.status(201).json(members)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static findMember(req, res) {
    member.findById(req.params.id)
      .then((foundMember)=> {
        res.status(201).json(foundMember)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static updateMember(req, res) {
    member.findByIdAndUpdate({_id : req.params.id},{ $set : req.body})
      .then( updatedMember => {
        res.status(200).json(updatedMember)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static deleteMember(req, res) {
    member.findByIdAndDelete({_id : req.params.id})
      .then( (deleted)=> {
        res.status(200).json(deleted)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}

module.exports = memberCollection