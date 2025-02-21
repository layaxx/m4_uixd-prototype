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
Die Installation fand statt am 05. Februar 2025, von 13:30 Uhr bis 16:00 Uhr am Stadt:Raum Bamerg, direkt am zentralen Omnibusbahnhof der Stadt. Zuvor bauten wir die Installation vor Ort rund 20 Minuten öffentlich auf. Kurz nachdem wir die Installation der Öffentlichkeit überließen und uns zurückzogen, interagierten die ersten zwei Passanten, indem sie eine Partei wählten. Gegebenenfalls hat der beobachtbare öffentliche Aufbau der Wahlkabine dazu beigetragen, dass die sich ersten beiden Interaktionen unmittelbar ereigneten, wohingegen die übrigen Interaktionen zeitlich deutlich entzerrter sind.

**Publikum**

Das Publikum am zentralen Omnibusbahnhof bestand im Wesentlichen aus zwei Gruppen. Eine Gruppe umfasst die Personen, die wartend an einer Haltestelle auf der ZOB-Insel standen und Blick auf die Installation hatten. Dies waren ab 13:30 Uhr mehrheitlich Schüler. Zu diesem Zeitpunkt war der ZOB gut gefüllt. Ab 14:30 Uhr waren die Haltestellen geleert und es hielten sich nur noch wenige Passanten an den Haltestellen auf. Die andere Gruppe besteht aus Passanten, die zufällig direkt an der Installation vorbeiliefen und bestand mehrheitlich aus Personen im Alter ab 40 Jahre.

Im Zeitraum von 13:55 Uhr bis 15:05 dokumentierten wir den Durchgangsverkehr vor der Installation, das Verhalten der Passanten und die jeweilige Gruppengröße. Insgesamt kamen in 70 Minuten 145 Personen direkt an der Installation vorbei. 112 gingen ohne Reaktion weiter, 31 Personen schauten auf das Display oder in die Wahlkabine (ohne zu Wählen) und 2 Personen gaben jeweils einzeln und unabhängig von einander ihre Stimme ab. Unter den 145 Personen befanden sich 24 Gruppen a 2 Personen.

**Aktivierungsmuster**

Während des Experiments fielen uns drei Muster auf, wie Passanten auf die Installation aufmerksam werden. Bis auf eine einzige Person haben alle interagierenden Passanten gemeinsam, dass sie nur deshalb interagierten, weil sie auf ihrem Weg sowieso an der Installation vorbeigehen mussten und somit zufällig auf die Wahlkabine oder Display 1 aufmerksam wurden. Nur eine einzige Person querte zielgerichtet die Straße und wich somit von seinem eigentlichen Weg ab, um zu partizipieren.

**Muster 1: Vorbeigehen & Schauen.**

Das häufigste Interaktionsmuster bestand darin, dass Passanten, die den Gehsteig vor dem Stadt:Raum entlangliefen, die Ergebnisse auf Display 1 betrachteten oder die Wahlkabine beim Vorbeigehen kurz in Augenschein nahmen. Display 1, dass die Wahlumfrageergebnisse zeigte, verleitete Passanten dazu, anzuhalten und sich die Ergebnisse einen Moment anzusehen, bevor sie weitergingen. Die Wahlkabine diente in diesem Fall als Trigger, der die Aufmerksamkeit auf den Stadt:Raum zog und dadurch womöglich die Wahrnehmung von Display 1 förderte. Nur wenige Passanten blieben stehen, um die Wahlkabine genauer anzusehen, sondern widmeten ihr im Vorbei gehen ein paar Blicke. 3 Passanten betraten zwar die Wahlkabine, wählten aber nicht. Der Großteil der Passanten hat natürlicherweise weder Display 1, noch der Wahlkabine ihre Aufmerksamkeit geschenkt.

**Muster 2: Vorbeigehen & Wählen.**

Alle Wähler bis auf einen kamen zufällig an der Wahlkabine vorbei und interagierten infolge dessen. Keiner der Wähler hat nachträglich auf dem benachbarten Display 1 nachgesehen, wie die Verteilung der Gesamtstimmen ausfällt. Die Wähler waren alle männlich und vermutlich über 40 Jahre alt.

**Muster 3: Straße queren.** 

Ein Passant (männlich, ca. 18 Jahre alt) querte vor der Interaktion aktiv die Straße und betrachtete auf Display 1 die Gesamtverteilung der Stimmen. Er fotografierte das Display mit seinem Smartphone und betrat daraufhin die Wahlkabine, um seine Stimme abzugeben. Da sich die Wahlentscheidung des jungen Manns mit der Partei mit den zu dieser Zeit meisten Stimmen deckte, mutmaßen wir, dass die Umfrageergebnisse ihn dazu motiviert haben, selbst abzustimmen.

**Interaktion**

Während des Deployments waren gleichermaßen vollständig durchgeführte Wahl-Interaktionen (Stimmabgabe ist erfolgt) und unvollständige Wahl-Interaktionen (es wurde versucht, eine Stimme abzugeben, aber es gelang nicht) zu beobachten. Zwei Seniorinnen hielten sich unabhängig von einander für eine Zeit von 30 bis 60 Sekunden in der Wahlkabine auf, ohne dass eine Stimmabgabe erfasst wurde. Bei einer der beiden Damen war zu beobachten, dass sie sogar in den Korb mit den Wahlkarten griff. In Folge dessen war für sie entweder unklar, was sie mit den Wahlkarten tun kann oder sie entschloss sich, nicht zu wählen, weil ihre Partei nicht als Wahlkarte abgebildet war (nur als Option "Sonstige"). Ein weiterer Passant (ca. Mitte 40) sprach uns aktiv an, als wir uns gerade in der Nähe der Wahlkabine befanden und fragte, ob er dort seine Stimme für die Bundestagswahl abgeben könne. Nachdem wir ihm das Experiment erklärt hatten, entschloss sich der Mann, an der Umfrage teilzunehmen. Der Mann löste die mit einer Schnur an der Installation befestigte Wahlkarte (die Befestigung diente dazu, Diebstahl zu verhindern und sollte gleichzeitig verdeutlichen, dass die Wahlkarte wieder zurückzulegen und nicht einzuwerfen ist) und fragte uns, was damit zu tun ist. Nachdem wir dem Mann das System erklärt hatten, steckte er die Wahlkarte mehrmals hektisch falsch herum in die Wahlurne und war sich im unklaren darüber, ob seine Stimme erfasst wurde oder nicht. Der Mann blickte dabei nicht auf das Display, sondern herunter auf die Wahlurne und konnte so auch nach erfolgreicher Stimmabgabe nicht feststellen, dass seine Stimme registriert wurde. Wir mutmaßen, dass der Mann das Display vollständig ignorierte, weil er glaubte, bereits alle Informationen von uns erhalten zu haben. Zudem betonte er mehrmals, dass er sehr in Eile ist (der Mann trug erkennbare Arbeitskleidung). Auch deshalb hat er sich wahrscheinlich nicht noch einmal die Zeit genommen, die Informationen auf dem Display zu lesen.

**Raumtypen**

**Display Space**

Im markierten Display Space sind nicht aus jeder Position beide Displays sichtbar, aus bestimmten Positionen ist sogar gar kein Display sichtbar. Allerdings ist mindestens die Wahlkabine aus jeder Position sichtbar, weshalb wir den Display Space entsprechend groß gewählt haben. Angrenzend an den Display Space befindet sich der Activation Space (nicht extra eingezeichnet), an dem Passanten auf die Installation aufmerksam werden /könnten/.

**Interaction Space**

Der Interaction Space befand sich unmittelbar vor Display 1 und in der Wahlkabine. Durch die Wahlkabine war der Interaction Space an dieser Stelle sehr isoliert, wohingegen der Interaction Space vor Display 1 auch Potential für Gruppeninteraktionen bot. In der Praxis hat sich gezeigt, dass auch Gruppen aus zwei Personen gemeinsam vor Display 1 stehen blieben und über die Ergebnisse sprachen.  

**Gap Space**

Aufgrund der Beschaffenheit des ZOB entstand durch die von Bussen befahrene Straße zwischen Gehsteig und Haltestellen ein toter Raum, der Distanz zur Installation schaffte. Insbesondere wenn ein Bus für mehrere Minuten an einer Haltestelle stand und die Sicht auf die Installation verdeckte, war der Raum hinter dem Bus verloren.

**Comfort Space**

Kurz hinter dem Gap Space befinden sich mehrere Sitzgelegenheiten an den Haltestellen, die Comfort Spaces bilden. Von hier aus ist das Geschehen an der Installation beim Warten auf den Bus direkt beobachtbar. Der mittlere Comfortspace ist der interessanteste, da von hier aus sowohl die Wahlkabine als auch Display 1 eingesehen werden können. Wir nahmen an, dass an dieser Stelle auch ein Social Interaction Space entstehen könnte, indem das Beobachtete in Gruppen zum Gesprächsthema wird und daraus neue Trigger zur Interaktion mit der Installation entstehen. Dies konnten wir leider nicht beobachten. Das queren der Straße zum Abgeben der Stimme war der Ausnahmefall.

**Potenzial zur Verbesserung**

Das Experiment hat gezeigt, dass die Installation die beabsichtigten Interaktionen triggern und von Passanten verstanden werden kann. Es gab jedoch auch Passanten, die nicht wussten, was sie tun sollten. Einzelne Teilaspekte des Konzepts gingen zudem nicht vollständig auf. Es stellte sich heraus, dass der wahrnehmbare Zusammenhang der beiden Displays sowie die Displayinhalte nicht optimal gelöst waren. Auch das User-Feedback an der Wahlkabine ließe sich verbessern.

**Zusammenhang der Displays**

Während des Experiments hat sich herausgestellt, dass der Zusammenhang der beiden Displays vermutlich nicht für alle ersichtlich war. Wähler wählten, ohne sich vor oder nach ihrer Wahl das nur wenige Meter entfernte Display mit den Umfrageergebnissen anzusehen. Gleichermaßen haben Personen, die sich interessiert die Ergebnisse angesehen haben, nicht an der Wahl teilgenommen. Wir gingen davon aus, dass die Einsicht in die Abstimmungsergebnisse als Trigger dienen kann. Einerseits, indem man seine Wahlpräferenz unterrepräsentiert sieht und der Partei infolge dessen zu mehr Stimmen verhelfen möchte. Andererseits, indem man seine Partei gut performen sieht und dementsprechend noch eine weitere Stimme zur Unterstützung gibt. Ein Mann (ungefähr 50 Jahre alt) schaute im Abstand einiger Zeit sogar zweimal auf die Umfrageergebnisse auf Display 1 und zeigte durch Kopfschütteln eine Reaktion auf die Ergebnisse. Er gab seine eigene Stimme jedoch nicht ab. 

Deshalb hätte auf beiden Displays klarer darauf hingewiesen werden müssen, dass noch ein weiteres Display existiert. Die Information war zwar in Textform vorhanden, ging aber offenbar auf dem Display unter. Hierzu sollten die Displayinhalte überarbeitet werden.

**Displayinhalte**

Die beiden Displays waren weitestgehend statisch und veränderten sich nur dann in Teilen, wenn eine Stimmabgabe registriert wurde. Statische Displays ziehen bei Weitem nicht so viel Aufmerksamkeit auf sich, wie bewegte Inhalte. Das wurde uns während des Experiments sehr deutlich klar, da Display 2 (vor der Wahlkabine) durch einen technischen Defekt ungefähr einmal pro Minute kurz aus- und wieder anflackerte, was automatisch den Blick dorthin wandern ließ, wenn sich das Display im Sichtfeld befand. Anstatt alle Informationen auf eine Seite zu packen, hätte man sie dynamisch nacheinander anzeigen lassen können - mit Animationen, die die Aufmerksamkeit auf sich ziehen. Dadurch wäre es auch möglich gewesen, den Displayzusammenhang zu verdeutlichen.

Für Display 2 in der Wahlkabine stellte sich heraus, dass durch die sehr nahe Platzierung der Wahlkabine am Schaufenster das Sichtfeld eingeschränkt wurde. Das Display war nicht vollständig wahrnehmbar, ohne seinen Kopf zu bewegen. Der Blick fiel somit immer nur auf einen Teilbereich des Displays, wohingegen die Bereiche drum herum währenddessen auch aus dem peripheren Sichtfeld verschwanden und damit blind waren. Zwar testeten wir die Anzeige vorher, doch wir haben dazu nicht die Wahlkabine aufgestellt. Ein Test mit Wahlkabine hätte dies schon eher auffallen lassen.

**User-Feedback bei der Wahl-Interaktion**

Während des Experiments ist aufgefallen, dass Teilnehmer, die das System nicht kennen, beim Wählen nach unten auf die Wahlurne blicken und nicht geradeaus auf das Display. Ein zusätzliches haptisches Feedback, ein Ton oder ein Leuchtsignal direkt an der Wahlurne als Erfolgsindikator würden das Verständnis erleichtern.
