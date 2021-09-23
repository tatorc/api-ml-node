const {getCurrency}= require('./currencies')

class Response{
    constructor(){
        this.status = {
            'success':  200,
            'notFound': 404,
            'error':    500,
        }
    }

    errorResponse(){
        const res = {
            'status': this.status.error,
            'data': 'Something goes wrong'
        }
        return res
    }

    emptyResponse(term){
        const res = {
            'status': this.status.success,
            'data': `No matches were found for <b>${term}</b>`
        }
        return res
    }

    itemNotFound(item){
        const res = {
            'status': this.status.notFound,
            'data': `Item <b>${item}</b> Not Found`
        }
        return res
    }

    items(registers){

        let author
        let categories = []
        let items = []

        if (typeof registers.filters !== 'undefined' && registers.filters.length > 0) {
            categories = registers.filters.find((filter) => filter.id === "category")?.values[0]?.path_from_root
        }

        registers.results.forEach( (item, i) => {
            let newItem = {}
            let currency = getCurrency(item.currency_id)

            newItem.id            = item.id
            newItem.title         = item.title
            newItem.picture       = item.thumbnail
            newItem.condition     = item.condition
            newItem.free_shipping = item.shipping.free_shipping
            newItem.state_name = item.address.state_name
            newItem.price = {
                "currency": currency.symbol,
                "amount":   item.price,
                "decimals": currency.decimal_places
            }
            items.push(newItem)
        })

        const res = {
            'status': this.status.success,
            'data': {author, categories, items}
        }

        return res
    }

    item(register){

        const item = register.item
        const description = register.description
        let newItem = {}
        let currency = getCurrency(item.currency_id)

        newItem.id    = item.id
        newItem.title = item.title
        newItem.price = {
            "currency": currency.symbol,
            "amount":   item.price,
            "decimals": currency.decimal_places
        }
        newItem.picture       = item.pictures[0].url
        // newItem.picture       = item.thumbnail
        newItem.condition     = item.condition
        newItem.free_shipping = item.shipping.free_shipping
        newItem.sold_quantity = item.sold_quantity

        newItem.description   = description.plain_text

        const res = {
            'status': this.status.success,
            'data':   newItem
        }

        return res
    }
}

module.exports = Response
