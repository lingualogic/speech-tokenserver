# Speech-Tokenserver

Um dem Speech-Framework Zugriff auf die Dialogflow-API Version 2 zu erlauben, wird ein AccessToken von der Google-Cloud benötigt. Um dieses AccessToken zur Verfügung zu stellen, wurde der Dialogflow-Tokenserver implementiert. Er erlaubt die Erzeugung eines AccessTokens mit Hilfe der vorhandenen Dialogflow-Credentials. Das AccessToken ist dann eine Stunde gültig, um auf die Dialogflow-API zuzugreifen.
Alternativ kann anstelle des Tokenservers auch eine Tokenfunktion in GCloud-Functions, oder eine Lambda-Funktion in AWS verwendet werden.

Im Speech-Framework müssen die URL des Tokenservers und die Projekt-ID des Dialogflow-Projektes hinterlegt werden. Damit kann das Speech-Framework auf den Tokenserver zugreifen, um sich ein AccessToken für die Zugriffe auf das Dialogflow-API zu besorgen.


## Letzte Version

* 0.5.23.0009 Release vom 10.07.2021 [Release Notizen](./CHANGELOG.md)


Diese Version ist verbunden mit: ancient-atoll-53491


## Voraussetzungen

Wir haben den Speech-Tokenserver auf Mac OS X 10.14 getestet. Als Plattformen können eingesetzt werden:

* Mac OS X >= 10.14
* Windows 10
* aktuelles Linux (z.B. Ubuntu 20.04)

NodeJS muss installiert sein.

* NodeJS >= 12.X und <= 14.X (LTS-Version)


## Credentials

Um den Speech-Tokenserver ausführen zu können, müssen die entsprechenden Credentials in credentials/dialogflow-credentials.js eingetragen werden. Man erhält diese Daten aus der Dialogflow-Website des eigenen Assistenten-Projekts.


## Installation

Zuerst muss das Speech-Tokenserver Github-Repsitory unter [https://github.com/lingualogic/speech-tokenserver](https://github.com/lingualogic/speech-tokenserver) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech-tokenserver
    $ cd speech-tokenserver

danach werden alle NPM-Pakete für den Speech-Tokenserver mit folgendem Befehl installiert:

    $ npm install


## Start des Servers

Der Tokenserver fuer Google wird lokal mit folgendem Befehl gestartet:

    $ npm run start:google

Der Tokenserver fuer Dialogflow wird lokal mit folgendem Befehl gestartet:

    $ npm run start:dialogflow


## Bekannte Probleme

Sollte der Frontend lokal nicht auf den Tokenserver zugreifen können, muss die URL eventuell von http://localhost:4200 auf http://127.0.0.1:4200 geändert werden oder umgekehrt. Manchmal
muss auch der Port 4200 auf 8080 oder einen anderen Wert angepasst werden.


## Projektverantwortliche (LinguaLogic Team)

Projektorganisation:  **Leo Füchsel** (leo@lingualogic.de)

Technische Umsetzung: **Stefan Brauer** (stefan@lingualogic.de)


-------------------

## Lizenz

Der Speech-Tokenserver wurde als Open Source unter der [MIT-Lizenz](./LICENSE) veröffentlicht.
