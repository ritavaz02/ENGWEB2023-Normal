var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res) {
  var data = new Date().toISOString().substring(0, 16);

  axios.get('http://localhost:15030/plantas')
    .then(dados => {
      res.render('index', { plantas: dados.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro});
    });
});

router.get('/plantas/adicionar', function(req, res) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('form_planta', { d: data });
});

router.get('/:id', function(req, res) {
  var data = new Date().toISOString().substring(0, 16);

  axios.get('http://localhost:15030/plantas/' + req.params.id)
    .then(dados1 => {
      
      res.render('planta', { planta: dados1.data, d: data });
        
    })
    .catch(erro => {
      res.render('error', {error: erro});
    });
});

router.post('/', function(req, res) {
  axios.post('http://localhost:15030/plantas', req.body)
    .then(dados => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro});
    });
});

router.post('/editar/:id', function(req, res) {
  axios.put('http://localhost:15030/plantas/' + req.params.id, req.body)
    .then(dados => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro});
    });
});

router.get('/plantas/eliminar/:id', function(req, res) {
  axios.delete('http://localhost:15030/plantas/' + req.params.id)
    .then(dados => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro});
    });
});

router.get('especies/:id', function(req, res) {
  var data = new Date().toISOString().substring(0, 16);
      axios.get('http://localhost:15030/plantas?especie=:id' + req.params.id)
      .then(dados1 =>{
        res.render('especie', { lista: dados1.data, d: data });
      })
      .catch(erro => {
        res.render('error', {error: erro});
      });
});

router.get('/especies/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:15030/plantas?especie=" + req.params.id)
    .then(response => {
      res.render('especie', { lista: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

module.exports = router;
