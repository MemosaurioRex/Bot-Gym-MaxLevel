import app from "./app";
import './database'

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
    console.log('Server run on port: ', app.get('port'), ' :D');
});