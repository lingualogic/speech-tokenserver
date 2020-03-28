/**
 * Token-Server fuer Google, um Tokens fuer die Web-Site zum Zugriff 
 * auf Google-API vom Google-Server zu holen.
 *
 * Das Token ist eine Stunde gueltig und wird dann erneuert.
 */

const googleAuth = require( 'google-oauth-jwt' );


// Zugriffsdaten fuer Dialogflow

const googleCredentials = require( './../credentials/google-credentials' );


// Url des Tokenzugriffs

const TOKENSERVER_WEB_URL = 'http://localhost:4200';
const TOKENSERVER_ACCESS_URL = '/google/token';


// Tokenwerte

const TOKEN_TIMEOUT = 60 * 55;
let tokenDate = new Date();
let currentToken = '';


/**
 * Berechnung der Zeitdifferenz zur Bestimmung der Restgueltigkeitsdauer eines Tokens
 */

function getDiffTime( date1, date2 ) {
    return date2.getTime() - date1.getTime();
}


/**
 * Holen des Tokens vom Google-Server
 */

function generateAccessToken() {
    // aktuelle Zeit fuer Gueltigkeitsdauer eintragen

    tokenDate = new Date();

    // Aufruf des Google-Servers zur Rueckgabe eines AccessToikens

    return new Promise(( resolve ) => {
        googleAuth.authenticate(
            {
                email: googleCredentials.GOOGLE_CLIENT_EMAIL,
                key: googleCredentials.GOOGLE_PRIVATE_KEY,
                scopes: [ googleCredentials.GOOGLE_SCOPE_URL ],
            },
            (err, token ) => {
                resolve( token );
           },
        );
    });
}


/**
 * Holen des Tokens vom Google-Server, wenn die Gueltigkeitsdauer ueberschritten ist
 */

async function getAccessToken(res) {
    // Berechnung der Restgueltigkeitsdauer in Sekunden

    const currentDate = new Date();
    const diffTime = Math.round( getDiffTime( tokenDate, currentDate ) / 1000 );

    // ist Restgueltigkeitsdauer abgelaufen, neues Token vom Google-Server holen

    if ( diffTime > TOKEN_TIMEOUT || !currentToken ) {
        currentToken = await generateAccessToken();
    }

    // Token zrueckgeben an Aufrufer mit Restgueltigkeitsdauer in sekunden

    // console.log('getAccessToken: ', currentToken, TOKEN_TIMEOUT - diffTime );
    const result = { token: currentToken, time: TOKEN_TIMEOUT - diffTime };
    res.json( result );
}


/**
 * Rueckgabe der Web-Url fuer den Zugriff des Clients
 */

exports.getWebUrl = () => {
    return googleCredentials.GOOGLE_WEB_URL || TOKENSERVER_WEB_URL;
}


/**
 * Initialisierung des Google-Tokenservers
 */

exports.init = aApp => {

    // pruefen auf vorhandene Google-Credentials

    if ( !googleCredentials.GOOGLE_PRIVATE_KEY || 
         !googleCredentials.GOOGLE_CLIENT_EMAIL || 
         !googleCredentials.GOOGLE_SCOPE_URL || 
         !googleCredentials.GOOGLE_WEB_URL ) {
        console.log('Error Tokenserver: fehlende Google Credentials');
        return;
    }

    // Holen des AccessTokens

    aApp.get( TOKENSERVER_ACCESS_URL, (req, res, next) => {
        getAccessToken( res );
    });

}
