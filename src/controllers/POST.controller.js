import { DF_CALL } from "../services/CALL_API.dialogflow"

export const message = async(req, res) => {

    try {
       const api_wsp      = req.body.entry[0].changes[0].value.messages[0].interactive
       const data_list         = req.body.entry[0].changes[0].value.messages[0].interactive
       
       if (data_list !== undefined) {
        if (data_list.type) {
          if ( data_list.type == "list_reply" ) {
            let msg_body        = data_list.list_reply.id;
            let msg_id          = req.body.entry[0].changes[0].value.messages[0].id
            let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id
            let from            = req.body.entry[0].changes[0].value.messages[0].from
            const credentials = {
              msg_id,
              phone_number_id,
              from,
              msg_body
            }
            DF_CALL( credentials, from )
          }
        }
       }
        if ( api_wsp ) {

          let msg_body        = api_wsp.button_reply.id;
          let msg_id          = req.body.entry[0].changes[0].value.messages[0].id
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id
          let from            = req.body.entry[0].changes[0].value.messages[0].from

          const credentials = {
            msg_id,
            phone_number_id,
            from,
            msg_body
          }
          DF_CALL( credentials, from )
        }
        if ( req.body.object ) {
          if ( req.body.entry && req.body.entry[0].changes && req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages && req.body.entry[0].changes[0].value.messages[0] ) {

              let msg_id          = req.body.entry[0].changes[0].value.messages[0].id
              let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id
              let from            = req.body.entry[0].changes[0].value.messages[0].from
              let msg_body        = req.body.entry[0].changes[0].value.messages[0].text.body
              let name_user       = req.body.entry[0].changes[0].value.contacts[0].profile.name

              const credentials = {
                msg_id,
                phone_number_id,
                from,
                msg_body,
                name_user
              }
              
              DF_CALL( credentials, from )

            }
            
            // res.sendStatus(200)
          } else {

            // res.status(400).send('Respuesta API no disponible')
          }
        } catch (error) {
          // res.status(202).send(error)
        }
        
}