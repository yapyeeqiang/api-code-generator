import axios from 'axios'

const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

export const queryAlbums = async () => {
    const { data } = await client.get('/albums')

    return data
}

export const deleteAlbum = async (id) => {
    const { data } = await client.delete(`/albums/${id}`)

    return data
}

