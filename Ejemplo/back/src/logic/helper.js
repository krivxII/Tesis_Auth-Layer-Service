import fetch from "node-fetch"
const ruta = "https://6fra5t373m.execute-api.eu-west-1.amazonaws.com/development/"

const helper = {

  async registrar({usuario, correo, contrasena}) {

    const response = await fetch(ruta + "users/" + usuario, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "firstName": correo, "password": contrasena }),
    }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));

    console.log(response)

    if ((600 > response.status) && (response.status > 499)) {//500
      console.log("error 500 en registrarUsuario")
      return await this.registrar({usuario, correo, contrasena})
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log("error 400 en registrarUsuario")
      console.log(response)
      return "0"
    }
    else if ((300 > response.status) && (response.status > 199)) {//300

      console.log("se registro al usuario")
      return "1"

    }

  },

  async autenticar({usuario, contrasena}) {

    const response = await fetch(ruta + "users/" + usuario + "/sessions", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "password": contrasena }),
    }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));

    if ((600 > response.status) && (response.status > 499)) {//500
      console.log("error 500 en registrarUsuario")
      return await this.autenticar({usuario, contrasena})
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log("error 400 en registrarUsuario")
      console.log(response)
      return 400
    }
    else if ((300 > response.status) && (response.status > 199)) {//300

      console.log("se registro al usuario")
      return response.body

    }

  },

  async validar(token) {

    console.log("+"+token)
    console.log(typeof token)



    let headers= {
      "authorization": token
    }
    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
   };
    const response = await fetch(ruta+"user", requestOptions)
      .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));

    console.log(response)
    
    if ((600 > response.status) && (response.status > 499)) {//500

      this.validar({token})
    }
    else if ((500 > response.status) && (response.status > 399)) {//400



      console.log("el token no fue validado sera destruido en validar")

      return 0


    }
    else if ((300 > response.status) && (response.status > 199)) {//200

      console.log("el token  fue validado en vaidarr")
      console.log(response.body.username)
      return response.body


    }

  }


}

export default helper