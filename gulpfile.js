/**
 * Automatisierung des Installprozesses fuer Speech-Tokenserver
 * Hier werden folgende Dinge nach der Installation der NPM-Packete durchgefuehrt:
 * 
 *      - dialogflow-credentials.js wird als leere Datei in credentials erzeugt
 */

'use strict';


// Module definieren

const fs = require('fs');
const gulp = require('gulp');
const file = require('gulp-file');
const inject = require('gulp-inject-string');
const runSequence = require('run-sequence');


/**
 * Erzeugt die Dialogflow-Credentials Datei
 */

gulp.task('install-dialogflow-credentials', function() {
    try {
        // pruefen auf vorhandene Dialogflow-Credentials Datei
        fs.accessSync( 'credentials/dialogflow-credentials.js' );
    } catch (e) {
        return gulp.src( `dialogflow-credentials.js` )
            .pipe( file( 'dialogflow-credentials.js', ''))
            .pipe(inject.append( "/**\n" ))
            .pipe(inject.append( " * Zugriffswerte fuer Google Dialogflow V2\n" ))
            .pipe(inject.append( " */\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "const DIALOGFLOW_PRIVATE_KEY = '';\n" ))
            .pipe(inject.append( "const DIALOGFLOW_CLIENT_EMAIL = '';\n" ))
            .pipe(inject.append( "const DIALOGFLOW_SCOPE_URL = '';\n" ))
            .pipe(inject.append( "const DIALOGFLOW_WEB_URL = '';\n" ))
            .pipe(inject.append( "\n" ))
            .pipe(inject.append( "module.exports = { DIALOGFLOW_PRIVATE_KEY, DIALOGFLOW_CLIENT_EMAIL, DIALOGFLOW_SCOPE_URL, DIALOGFLOW_WEB_URL };\n" ))
            .pipe( gulp.dest( 'credentials' ));
    }
});


/**
 * Installiert alle benoetigten Dateien
 */

gulp.task('install', (callback) => {
    runSequence(
        'install-dialogflow-credentials',
        callback
    );
});


