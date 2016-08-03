var express = require('express')
var development = require('../knexfile').development
var knex = require('knex')(development)

module.exports = {
  get: get,
  profilePage: profilePage,
  addUser: addUser,
  addUserForm: addUserForm
}

function get (req, res) {
  knex('users')
    .select()
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

function profilePage (req, res) {
  var userId = req.params
  knex('users')
  .join('profiles', 'user_id', '=', 'users.id')
  .select()
  .then(function (data) {
    for(var i = 0; i < data.length; i++) {
      if (data[i].user_id == userId.id) {
        res.render('profile', {profiles: data[i]})
      }
    }
  })
  .catch(function(err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}

function addUser (req, res) {
  var name = req.query.name
  var url = req.query.url
  var email = req.query.email
  var profilePicUrl = req.query.profilePicUrl
  knex('users')
    .insert({name: name, email: email})
    .catch(function (err) {
      console.error(err.message)
      res.status(500).send("Can't display users!")
    })
  knex('profiles')
    .insert({url: url, profilePic: profilePicUrl})
    .then(res.redirect(301, '/'))
    .catch(function (err) {
      console.error(err.message)
      res.status(500).send("Can't display users!")
    })

}
// 'profiles.url', 'users.id'

function addUserForm (req, res) {
  res.render('admin', '')

}
