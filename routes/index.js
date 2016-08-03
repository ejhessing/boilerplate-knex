var express = require('express')
var development = require('../knexfile').development
var knex = require('knex')(development)

module.exports = {
  get: get,
  profilePage: profilePage
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
  knex('users')
  .join('profiles', 'user_id', '=', 'users.id')
  .select('profiles.url', 'users.id')
  .then(print)
  .then(function (data) {
    res.render('profile', {profiles: data})
  })
  .catch(function(err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}


function print (data) {
  console.log(data)
}
