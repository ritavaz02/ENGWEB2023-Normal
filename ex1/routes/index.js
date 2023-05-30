var express = require('express');
var router = express.Router();
var Planta = require('../controllers/planta');

/* GET planta */
router.get('/plantas/freguesias', function(req, res, next) {
  console.log("here")
  Planta.getPlantasFreguesias()
    .then(c => {
      res.jsonp(c)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das freguesias da planta" + req.params.id})
    })
});

router.get('/plantas/especies', function(req, res, next) {
  Planta.getPlantasEspecies()
    .then(c => {
      res.jsonp(c)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das freguesias da planta" + req.params.id})
    })
});


/* GET planta */
router.get('/plantas/:id', function(req, res, next) {
  Planta.getPlanta(req.params.id)
    .then(c => {
      res.jsonp(c)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da planta" + req.params.id})
    })
});

/* POST planta */
router.post('/plantas', function(req, res, next) {
  Planta.addPlanta(req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção da planta"})
    })
});


// /* GET plantas */
router.get('/plantas', function(req, res, next) {
  if (req.url.includes("especie")){
    Planta.getEspecieX(req.query.especie)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção da especie")
    })
  }
  else if  (req.url.includes("implant"))
  {
    Planta.getImplantX(req.query.implant)
    .then(l => {
      res.jsonp(l)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção dos implants"})
    })
  }
  else{
  Planta.list()
    .then(listas => {
      res.jsonp(listas)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das lista de plantas"})
    })
  }
});

/* PUT planta */
router.put('/plantas/:id', function(req, res, next) {
  req.body._id = req.params.id
  Planta.addPlanta(req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na atualização da planta"})
    })
});

/* DELETE planta */
router.delete('/plantas/:id', function(req, res, next) {
  Planta.deletePlanta(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na eliminação da planta"})
    })
});



module.exports = router;
