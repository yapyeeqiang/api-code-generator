import { readYAML } from './utils/yaml.js'
import { TEMPLATE, parseTemplate, parseEndpoints, parseFileName } from './utils/parse.js'
import fs from 'fs'

const cwd = process.cwd()

function generate() {
    const [api] = readYAML('./api.yaml')
    const { base_url, endpoints } = api

    const axiosClientTemplate = parseTemplate(TEMPLATE('axios-client'), {
        base_url,
    })

    for (let endpoint of endpoints) {
        const currentTemplate = [axiosClientTemplate]

        const parsedEndpoints = parseEndpoints(endpoint)

        parsedEndpoints.forEach(({ method, action, path }) => {
            const output = parseTemplate(TEMPLATE(method), {
                action,
                method,
                path,
            })

            currentTemplate.push(output)
        })

        const fileName = parseFileName(endpoint)

        if (fs.existsSync(`${cwd}/api/${fileName}`)) {
            fs.unlinkSync(`${cwd}/api/${fileName}`)
        }

        currentTemplate.forEach((template) => {
            if (!fs.existsSync(`${cwd}/api`)) {
                fs.mkdirSync(`${cwd}/api`)
            }

            fs.appendFileSync(`${cwd}/api/${fileName}`, template + '\n')
        })
    }
}

generate()
