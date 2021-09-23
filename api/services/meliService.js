const axios  = require('axios').default
const config = require('../config')
const response = require('../helpers/response')
const cleanify = require('../helpers/parseFromHtml')
const oResponse = new response()

const searchItems = async term => {
    try {

        let sanitizedRequest = cleanify(term)
        let items = oResponse.emptyResponse(sanitizedRequest)

        if (sanitizedRequest) {
            const searchUrl = config.api_meli + `/sites/MLA/search?q=${sanitizedRequest}&limit=4`
            const response = await axios.get(searchUrl)
            const data = response.data

            if (data.paging.total > 0){
                items = oResponse.items(data)
            }
        }

        return items

    } catch (error) {
        return oResponse.errorResponse()
    }
}

const getItem = async id => {
    try {

        let sanitizedRequest = cleanify(id)
        const itemUrl = config.api_meli + `items/${sanitizedRequest}`;
        const itemDescriptionUrl = itemUrl + '/description';

        const responses = await axios.all([
            axios.get(itemUrl),
            axios.get(itemDescriptionUrl)
        ])

        const item = responses[0].data
        const description = responses[1].data

        let oItem = {
            item, description
        }

        return oResponse.item(oItem)

    } catch (error) {
        return oResponse.itemNotFound(id)
    }
}

module.exports = {
    searchItems, getItem
}