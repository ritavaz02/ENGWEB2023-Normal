var Planta = require('../models/planta')

// Lista
module.exports.list = () => {
    return Planta.find()
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })

}

//GET /plantas/:id
module.exports.getPlanta = id => {
    return Planta.findOne({_id: id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

//POST /plantas
module.exports.addPlanta = p => {
    return Planta.find({}, {_id: 1})
    .then(qtd => {
        var list = qtd.map( obj => {
            return {_id: obj._id};
        });

        list.sort((a,b) => parseInt(b._id) - parseInt(a._id));
        var next = parseInt(list[0]._id) + 1;
        p._id = next
        return Planta.create(p)
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
    })
    .catch(erro => {
        return erro
    })
}

//PUT /plantas/:id
module.exports.updatePlanta = l => {
    return Planta.updateOne({_id: l._id}, l)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

//DELETE /plantas/:id
module.exports.deletePlanta = id => {
    return Planta.deleteOne({_id: id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getPlantasFreguesias = cid => {
    console.log("here")
    return Planta.distinct("Freguesia").sort()
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getPlantasEspecies = cid => {
    return Planta.distinct("Espécie").sort()
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}


module.exports.getEspecieX = x => {
    return Planta.find({"Espécie": x})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getImplantX = x => {
    return Planta.find({"Implantação": x})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}