import fs from 'fs'
import ejs from 'ejs'
import { capitalize, pluralize } from './string.js'

const cwd = process.cwd()

export const TEMPLATE = (name) => {
    return fs.readFileSync(`${cwd}/assets/${name}-template.txt`, 'utf8')
}

export const parseTemplate = (template, data) => {
    return ejs.render(template, data)
}

export const parseFileName = (data) => {
    const resource = Object.keys(data)[0]

    return `${resource}.js`
}

export const parseEndpoints = (data) => {
    const resource = Object.keys(data)[0]
    const endpoints = Object.entries(data[resource])
    const parsedEndpoints = []

    const methodsMap = {
        GET: {
            ONE: 'get',
            MANY: 'query',
        },
        POST: 'add',
        PATCH: 'update',
        DELETE: 'delete',
    }

    for (let endpoint of endpoints) {
        const [item, metadata] = endpoint
        const [method, path] = item.split(' ')
        const isMethodGet = method === 'GET'
        const isDataArray = metadata.data.type === 'Array'

        let action
        if (isMethodGet) {
            action = methodsMap[method][isDataArray ? 'MANY' : 'ONE']
            action += isDataArray ? pluralize(capitalize(resource)) : capitalize(resource)
        } else {
            action = methodsMap[method]
            action += capitalize(resource)
        }

        parsedEndpoints.push({
            method: isMethodGet && isDataArray ? 'query' : method.toLowerCase(),
            action,
            path: path.replace(/{id}/g, '${id}'),
        })
    }

    return parsedEndpoints
}
