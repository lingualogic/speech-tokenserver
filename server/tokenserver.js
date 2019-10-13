/**
 * Token-Server fuer Dialogflow, um Tokens fuer die Web-Site zum Zugriff 
 * auf Dialogflow vom Google-Server zu holen.
 *
 * Das Token ist eine Stunde gueltig und wird dann erneuert.
 */

const express = require("express");
const googleAuth = require( 'google-oauth-jwt' );


// Zugriffsdaten fuer Dialogflow

const dialogflowCredentials = require( './../credentials/dialogflow-credentials' );
const tokenserverVersion = require( './tokenserver-version.js' );


// Port des Servers

const TOKENSERVER_ACCESS_PORT = 3000
const TOKENSERVER_ACCESS_URL = '/dialogflow/token';


// Tokenwerte

const TOKEN_TIMEOUT = 60 * 55;
let tokenDate = new Date();
let currentToken = '';


/**
 * pruefen auf vorhandene Credentials
 */

if ( !dialogflowCredentials.DIALOGFLOW_PRIVATE_KEY || 
     !dialogflowCredentials.DIALOGFLOW_CLIENT_EMAIL || 
     !dialogflowCredentials.DIALOGFLOW_SCOPE_URL || 
     ! dialogflowCredentials.DIALOGFLOW_WEB_URL ) {
    console.log('Error Tokenserver: fehlende Credentials');
    return;
}


/**
 * Express-App 
 */

const app = express();


/**
 * Zugriffsrechte des Servers definieren
 */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", dialogflowCredentials.DIALOGFLOW_WEB_URL );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * Holen des AccessTokens
 */

app.get( TOKENSERVER_ACCESS_URL, (req, res, next) => {
    getAccessToken( res );
});


/**
 * Berechnung der Zeitdifferenz zur Bestimmung der Restgueltigkeitsdauer eines Tokens
 */

function getDiffTime( date1, date2 ) {
    return date2.getTime() - date1.getTime();
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
 * Holen des Tokens vom Google-Server
 */

function generateAccessToken() {
    // aktuelle Zeit fuer Gueltigkeitsdauer eintragen

    tokenDate = new Date();

    // Aufruf des Google-Servers zur Rueckgabe eines AccessToikens

    return new Promise(( resolve ) => {
        googleAuth.authenticate(
            {
                email: dialogflowCredentials.DIALOGFLOW_CLIENT_EMAIL,
                key: dialogflowCredentials.DIALOGFLOW_PRIVATE_KEY,
                scopes: [ dialogflowCredentials.DIALOGFLOW_SCOPE_URL ],
            },
            (err, token ) => {
                resolve( token );
           },
        );
    });
}

// starten des Tokenservers

app.listen( TOKENSERVER_ACCESS_PORT, () => {
    console.log(`Dialogflow Token-Server ${tokenserverVersion.TOKENSERVER_VERSION_STRING}`);
    console.log(`listening on port ${TOKENSERVER_ACCESS_PORT}!`);
});
    
