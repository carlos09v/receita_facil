import axios from "axios";

// Rodar com IPv4: json-server --watch -d 180 --host 192.168.15.7 db.json

const api = axios.create({
    baseURL: 'http://192.168.15.7:3000/'
})

export default api