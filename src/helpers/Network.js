import axios from 'axios'

const Network = class NETWORK {
    constructor(axios) {
        this.network = axios.create({
            baseURL: 'http://10.0.10.45:8058/museai/'
        })
    }

    get = async path => {
        return await this.network.get(path).then(r => (r.data))
    }

    post = async (path, body, headers) => {
        return await this.network.post(path, body, { headers })
            .then(r => (r.data))
    }

    put = async (path, body, headers) => {
        return await this.network.put(path, body, { headers })
            .then(r => (r.data))
    }
}

export default new Network(axios)