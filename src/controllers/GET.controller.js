
export const GET_method = async (req, res) => {

    const verify_token = process.env.VERIFY_TOKEN;

    let mode      = req.query["hub.mode"];
    let token     = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === verify_token) {
      console.log("token verificado correctamente");
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
  }
}