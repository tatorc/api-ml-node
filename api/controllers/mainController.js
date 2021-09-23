const {searchItems, getItem} = require ('../services/meliService')

const index = (req, res) => {

    const term = req.query.q;

    searchItems(term)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.status( 500 )
            .send( err )
        });
}

const show = (req, res) => {
    const id = req.params.id

    getItem(id)
    .then(item => {
        res.send(item)
    })
    .catch(err => {
        res.status( 500 )
        .send( err )
    });
}

module.exports = {
    index, show
}
