import fs from 'fs'
import yaml from 'js-yaml'

export const readYAML = (yamlFilePath) => {
    try {
        const raw = fs.readFileSync(yamlFilePath, 'utf8')
        const parsedYaml = yaml.loadAll(raw)

        return parsedYaml
    } catch (error) {
        throw error
    }
}
