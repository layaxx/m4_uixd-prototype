---
title:  'UIxD Assignment 4 - Prototypische Implementierung und Testdeployment'
author:
- Niklas Schäfer
- Yannick Lang
...

# Urban Prototype

## Konzept

Basierend auf den in dem vorherigen Assignment identifizierten Favoriten haben wir ein finales Konzept für den Prototypen ausgearbeitet. Dabei haben wir mit unserer "Wahl-Quiz"-Idee begonnen, und diese iterativ zu dem im Folgenden beschriebenen Konzept einer Wahlumfrage entwickelt, die Transparenz mit dem Wahlgeheimnis verbindet.

Hierbei werden beide Public Displays am Stadt:Raum genutzt. Vor einem der Displays wird eine Wahlkabine aufgestellt. Interessierte Passanten können in diese Wahlkabine treten und für eine der Parteien, die bei der kommenden Bundestagswahl zur Wahl stehen, abstimmen. Die Abstimmung erfolgt, indem die zur Partei gehörende Karte kurz in eine Wahlurne gehalten und anschließend zurückgelegt wird. Auf dem Public Display in der Wahlkabine wird dem Teilnehmenden angezeigt, wie die Umfrage abläuft und eine Rückmeldung über die erfolgte Stimmabgabe gegeben.

Durch die Kombination aus Wahlkabine, Urne und die den Stimmzettel symbolisierenden Karten soll möglichst stark das Gefühl einer echten Wahl und dem damit verbundenen Wahlgeheimnis aufkommen. Kontrastiert wird das einerseits durch das zweite Display, das neben den (vorläufigen) Umfrageergebnissen auch die Stimme des aktuell in der Wahlkabine stehenden Teilnehmenden dokumentiert und damit für andere Passanten sichtbar macht. Zusätzlich sind die Wände der Wahlkabine zwar bedeckt, aber nicht wirklich blickdicht.

## Zentrale Forschungsfrage

Unser Ziel ist es, mithilfe des Prototypen herauszufinden, wie Teilnehmer auf diesen Kontrast aus Wahlgeheimnis und Transparenz reagieren.

## Umsetzung

### Wahlkabine

Die Wahlkabine ist 2 meter hoch und hat eine Grundfläche von in etwa 80x80cm. Der Rahmen besteht aus Holz. Die Seiten sind mit einem dunklen Bettlagen abgehangen, um den Eindruck einer Wahlkabine zu erzeugen und den Teilnehmenden etwas Sichtschutz zu gewähren, allerdings sind die Wände damit nicht blickdicht. Die Wahlkabine wird vor dem einen Schaufenster des Stadt:Raum positioniert und verdeckt damit die Sicht auf eines der Public Displays für Passanten, nicht aber für den aktuellen Teilnehmer in der Kabine.

### Urne und Stimmzettel

Die Urne ist ebenfalls aus Holz gefertigt und schwarz lackiert. Oben befindet sich ein Schlitz, in den die Wahlzettel eingesteckt werden können. Damit die Wahlzettel beliebig wiederverwendbar sind, können diese allerdings nicht komplett, sondern nur circa 2 Centimeter eingesteckt werden. Die Urne ist in der Wahlkabine direkt vor dem Public Display angebracht.

Die Wahlzettel haben in etwa die Maße 8.56x7cm und sind damit so breit wie eine Standard-Kreditkarte, aber höher und etwas quadratischer. Auf den Stimmzettel ist das Logo der entsprechenden Partei aufgedruckt. Das Papier wurde zusammen mit einer RFID-Karte, auf der die entsprechende Partei gespeichert wurde, laminiert.

In der Urne befindet sich ein RFID-Sensor, der mit einem RaspberryPi Zero verbunden ist. Die Stromversorgung erfolgt durch eine Powerbank. Wenn eine Stimmkarte in die Urne gesteckt wird, erkennt der Sensor anhand der RFID-Karte die Partei und schickt einen GET-Request an den im folgenden beschriebenen Server.

### Public Displays

Die beiden Public Display sind mit einem Laptop verbunden, der als Server fungiert.
Dieser empfängt die Requests vom RaspberryPi Zero in der Wahlurne und leitet die Daten an zwei Websites weiter, jeweils eine pro Public Display.
Auf dem öffentlich einsehbaren PD wird dann die aktuelle Statistik, auf dem in der Wahlkabine eine Rückmeldung über die erhaltene Stimme angezeigt.
Die Kommunikation zwischen Server und den Browsern, die die Websites anzeigen, geschieht dabei über Server-Sent Events, wodurch die Browser auch auf einem anderen Gerät laufen können.

Alle Geräte befinden sich der Einfachheit halber im selben WLAN.

# Kontextualisierung des Prototyps und Reflektion

## Beobachtungen beim Deployment
Die Installation fand statt am 05. Februar 2025, von 13:30 Uhr bis 16:00 Uhr am Stadt:Raum Bamerg, direkt am zentralen Omnibusbahnhof der Stadt. Zuvor bauten wir die Installtion vor Ort rund 20 Minuten öffentlich auf. Kurz nachdem wir die Installation der Öffentlichkeit überließen und uns zurückzogen, interagierten die ersten zwei Passanten, indem sie eine Partei wählten. Gegebenfalls hat der beobachtbare öffentliche Aufbau der Wahlkabine dazu beigetragen, dass die sich ersten beiden Interaktionen unmittelbar ereigneten, wohingegen die übrigen Interaktionen zeitlich deutlich entzerrter sind.

### Publikum



### Interaktionsmuster
Während des Experiments fielen uns drei Muster auf, wie Passanten auf die Installation aufmerksam werden und wie sie mit ihr interagieren. Bis auf eine einzige Person haben alle interagierenden Passanten gemeinsam, dass sie nur deshalb interagierten, weil sie auf ihrem Weg sowieso an der Installation vorbeigehen mussten und somit zufällig auf die Wahlkabine oder Display 1 aufmerksam wurden. Nur eine einzige Person querte zielgerichtet die Straße und wich somit von seinem eigentlichen Weg ab, um zu partizipieren.

**Muster 1: Vorbeigehen & Schauen.** Das häufigste Interaktionsmuster bestand darin, dass Passanten, die den Gehsteig vor dem Stadt:Raum entlangliefen, die Ergebnisse auf Display 1 betrachteten oder die Wahlkabine beim Vorbeigehen kurz in Augenschein nahmen. Display 1, dass die Wahlumfrageergebnisse zeigte, verleitete Passanten dazu, anzuhalten und sich die Ergebnisse einen Moment anzusehen, bevor sie weitergingen. Die Wahlkabine diente in diesem Fall als Trigger, der die Aufmerksamkeit auf den Stadt:Raum zog und dadurch womöglich die Wahrnehmung von Display 1 förderte. Nur wenige Passanten blieben stehen, um die Wahlkabine genauer anzusehen, sondern widmeten ihr im Vorbei gehen ein paar Blicke. 3 Passanten betraten zwar die Wahlkabine, wählten aber nicht. Der Großteil der Passanten hat natürlicherweise weder Display 1, noch der Wahlkabine ihre Aufmerksamkeit geschenkt. 

**Muster 2: Vorbeigehen & Wählen.**
Alle Wähler bis auf einen kamen zufällig an der Wahlkabine vorbei und interagierten infolge dessen. Keiner der Wähler hat nachträglich auf dem benachbarten Display 1 nachgesehen, wie die Verteilung der Gesamtstimmen ausfällt. Die Wähler waren alle männlich und vermutlich über 40 Jahre alt.

**Muster 3: Straße queren.**
Ein Passant (männlich, ca. 18 Jahre alt) querte vor der Interaktion aktiv die Straße und betrachtete auf Display 1 die Gesamtverteilung der Stimmen. Er fotografierte das Display mit seinem Smartphone und betrat daraufhin die Wahlkabine, um seine Stimme azugeben. Da sich die Wahlentscheidung des jungen Manns mit der Partei mit den zu dieser Zeit meisten Stimmen deckte, mutmaßen wir, dass die Umfrageergebnisse ihn dazu motiviert haben, selbst abzustimmen.



## Umgebungsplan

## Reflektion
