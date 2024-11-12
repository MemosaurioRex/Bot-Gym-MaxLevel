import dialogflow from 'dialogflow'
import config2 from './data'
import UserWsp from "../../models/UserWsp";

require('dotenv').config()

const projectId = config2.googleProyectId;
const sessionId = config2.dialogFlowSessionId;

const credentials = {
    client_email: config2.googleClientEmail,
    private_key: config2.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

export const textQuery = async ( userText, sessionId ) => {
    const sessionPath   = sessionClient.sessionPath( projectId, sessionId+'userId' );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: config2.dialogFlowSessionLanguageCode
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
export const sessionClosed = async ( data, sessionId ) => {
  const sessionPath   = sessionClient.sessionPath( projectId, sessionId+'userId' );

  const request = {
    session: sessionPath,
    queryInput: {
        text: {
            text: data,
            languageCode: config2.dialogFlowSessionLanguageCode
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