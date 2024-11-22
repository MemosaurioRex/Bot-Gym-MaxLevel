
import dialogflow from 'dialogflow'

require('dotenv').config();

const projectId = process.env.googleProyectId;
const sessionId = process.env.dialogFlowSessionId;

const credentials = {
    client_email: process.env.googleClientEmail,
    private_key: process.env.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

export const textQuery = async ( userText, sessionId ) => {
    const sessionPath   = sessionClient.sessionPath( projectId, sessionId+'userId' );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: process.env.dialogFlowSessionLanguageCode
            }
        }
    }
    try {
        const response = await sessionClient.detectIntent(request);
        return response[0].queryResult
    } catch ( err ) {
        console.log(`Error: ${err}`);
        return err
    }
}
// export const sessionClosed = async ( data, sessionId ) => {
//   const sessionPath   = sessionClient.sessionPath( projectId, sessionId+'userId' );

//   const request = {
//     session: sessionPath,
//     queryInput: {
//         text: {
//             text: data,
//             languageCode: config2.dialogFlowSessionLanguageCode
//         }
//     }
// }
// try {
//     const response = await sessionClient.detectIntent(request);
//     return response[0].queryResult
// } catch ( err ) {
//     console.log(`Error: ${err}`);
//     return err
// }
// }