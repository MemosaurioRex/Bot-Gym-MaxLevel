import axios from "axios";

export function WSP_MSG(phone_number_id, msg_body, from) {

  const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP
  const postData = {
    messaging_product: "whatsapp",
    to: from,
    status: "read",
    text: { body: msg_body },
  }

  axios.post(url, postData)
    // .then( function ( response ) {
    //     console.log( response.data );
    // } )

}

export function WSP_MSG_READ(phone_number_id, data) {
  const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP

  const postData = {
    messaging_product: "whatsapp",
    status: "read",
    message_id: `${data}`
  }
  axios.post(url, postData)
}

export function WSP_MSG_REACTION(phone_number_id, from, data, emoji) {
  const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP

  const postData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: from,
    type: "reaction",
    reaction: {
      message_id: data,
      emoji: emoji
    }
  }
  axios.post(url, postData)
}
// TODO: Crear lista
export function WSP_MSG_LIST(phone_number_id, from, header_data, list_data) {
  try {
    const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP

    const postData = {
      messaging_product: "whatsapp", recipient_type: "individual", to: from, type: "interactive",
      interactive: {
        type: "list",
        header: { type: "text", text: header_data.titulo },
        body: { text: header_data.cuerpo },
        footer: { text: header_data.footer },
        action: {
          button: header_data.button,
          sections: [
            { title: "asd", rows: list_data }
          ]
        }
      }
    }
    axios.post(url, postData)
  } catch (e) {
    console.log('Error en enviar lista')
  }
}

export function WSP_MSG_BUTTONS(phone_number_id, from, data) {
  try {
    const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP

    const postData = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "interactive",
      interactive: {
        type: "button",
        body: { text: data[0].text },
        action: { buttons: data[0].buttons }
      }
    }
    axios.post(url, postData)
  } catch (e) {
    console.log('Error en enviar mensaje con botones');
  }
}

export function WSP_CONTACT(phone_number_id, from) {
  try {
    const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP
    const postData = {
      messaging_product: "whatsapp",
      to: from,
      type: "contacts",
      contacts: [
        {
          name: {
            formatted_name: process.env.ADMIN_NAME,
            first_name: process.env.ADMIN_NAME
          },
          phones: [
            {
              phone: process.env.ADMIN_PHONE
            }
          ]
        }
      ]
    }
    axios.post(url,postData)
  } catch (e) {
    console.log('Error en enviar tarjeta de contacto');
  }
}
export function WSP_BUTTON_TEXT( phone_number_id, from, key ) {

  try {
    const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP

    const postData = {
        messaging_product: "whatsapp",
        to: from,
        type: "interactive",
        interactive: {
            type: "button",
            body: {
                text: "¿Deseas volver a consultar por rangos?"
            },
            action: {
                buttons: [
                    {
                        type: "reply",
                        reply: {
                            id: key,
                            title: "volver atrás"
                        }
                    }
                ]
            }
        }
    }
    axios.post(url,postData)
  } catch (error) {
    console.log('Error en enviar boton con texto');
  }

}

export function WSP_LOCATION_GOOGLE_MAPS( phone_number_id, from ) {

  try {
    const url = process.env.CALL_HTTP + phone_number_id + process.env.CALL_HTTP_TOKEN + process.env.TOKEN_WSP

    const postData = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: from,
        type: "location",
        location: {
            latitude: process.env.LATITUDE,
            longitude: process.env.LONGITUDE,
            name: process.env.NAME,
            address: process.env.ADDRESS
        }
      }
    axios.post(url,postData)
  } catch (error) {
    console.log('Error en enviar google maps');
  }

}