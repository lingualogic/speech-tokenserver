# Speech-Tokenserver

Um dem Speech-Framework Zugriff auf die Dialogflow-API Version 2 zu erlauben, wird ein AccessToken von der Google-Cloud benötigt. Um dieses AccessToken zur Verfügung zu stellen, wurde der Dialogflow-Tokenserver implementiert. Er erlaubt die Erzeugung eines AccessTokens mit Hilfe der vorhandenen Dialogflow-Credentials. Das AccessToken ist dann eine Stunde gültig, um auf die Dialogflow-API zuzugreifen.
Alternativ kann anstelle des Tokenservers auch eine Tokenfunktion in GCloud-Functions, oder eine Lambda-Funktion in AWS verwendet werden.

Im Speech-Framework müssen die URL des Tokenservers und die Projekt-ID des Dialogflow-Projektes hinterlegt werden. Damit kann das Speech-Framework auf den Tokenserver zugreifen, um sich ein AccessToken für die Zugriffe auf das Dialogflow-API zu besorgen.


## Letzte Version

* 0.5.15.0001 Beta vom 13.10.2019 [Release Notizen](./CHANGELOG.md)


## Voraussetzungen

Wir haben den Speech-Tokenserver auf Mac OS X 10.14 getestet. Als Plattformen können eingesetzt werden:

* Mac OS X >= 10.11
* Windows 10
* aktuelles Linux (z.B. Ubuntu 18.04)

NodeJS muss installiert sein.

* NodeJS >= 10.X (LTS-Version)


## Credentials

Um den Speech-Tokenserver ausführen zu können, müssen die entsprechenden Credentials in credentials/dialogflow-credentials.js eingetragen werden. Man erhält diese Daten aus der Dialogflow-Website des eigenen Assistenten-Projekts.


## Installation

Zuerst muss das Speech-Tokenserver Github-Repsitory unter [https://github.com/lingualogic/speech-tokenserver](https://github.com/lingualogic/speech-tokenserver) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech-tokenserver
    $ cd speech-tokenserver

danach werden alle NPM-Pakete für den Speech-Tokenserver mit folgendem Befehl installiert:

    $ npm install


## Start des Servers

Der Tokenserver wird lokal mit folgendem Befehl gestartet:

    $ npm start


## Bekannte Probleme


## Projektverantwortliche (LinguaLogic Team)

Projektorganisation:  **Leo Füchsel** (leo@lingualogic.de)

Technische Umsetzung: **Stefan Brauer** (stefan@lingualogic.de)


-------------------

## Lizenz

Der Speech-Tokenserver wurde als Open Source unter der [MIT-Lizenz](./LICENSE) veröffentlicht.