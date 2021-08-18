import fetch from "node-fetch"

const Redis_ruta = process.env.URL_REDIS || "http://192.168.56.1:8082/registrar"

const redisHelper = {

    async registrarCredenciales({ correo, token }) {

        console.log(correo + "  " + token)
        const redisResponse = await fetch(Redis_ruta + "registrar", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, token }),
        }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


        console.log("response11-------------------------------------------"); console.log(redisResponse);
        return await redisResponse.body.numero

    },

    async validarNumero(numero) {

        console.log(numero)
        const response = await fetch(Redis_ruta + "validar", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ numero }),
        }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));



        console.log(response);

        return (response.body)
    }

}

export default redisHelper