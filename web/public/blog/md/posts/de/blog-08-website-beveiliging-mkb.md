---
title: "Website-Sicherheit: Was jedes KMU-Unternehmen 2026 wissen muss"
slug: website-beveiliging-mkb-2026
description: "Denken Sie, Hacker greifen nur große Unternehmen an? 43 % der Cyberangriffe richten sich gegen KMU. Das müssen Sie wissen, um Ihre Website zu schützen."
keywords: Website Sicherheit, Website absichern, SSL Zertifikat, Security Header, Website gehackt, Website Sicherheit KMU, HTTPS Website
author: ultimAItech
date: 2026-05-25
lang: de
---

# Website-Sicherheit: Was jedes KMU-Unternehmen 2026 wissen muss

„Mein Unternehmen ist zu klein, um gehackt zu werden." Das höre ich regelmäßig. Und es stimmt nicht.

43 % aller Cyberangriffe richten sich gegen kleine und mittlere Unternehmen. Nicht weil sie wertvolle Daten haben, sondern weil sie leichte Ziele sind. Keine IT-Abteilung, kein Sicherheitsprotokoll, oft veraltete Software.

Sie müssen kein Sicherheitsexperte werden. Aber die Grundlagen müssen stimmen. In diesem Artikel erkläre ich, was das bedeutet — ohne Fachjargon.

## Was steht auf dem Spiel?

Wenn Ihre Website gehackt wird, sind das die möglichen Folgen:

- **Google warnt Besucher** mit „Diese Seite wurde möglicherweise gehackt" — Ihr Traffic fällt auf null
- **Kundendaten lecken** — Formulareingaben, E-Mail-Adressen, möglicherweise Zahlungsdaten
- **Ihre Seite verbreitet Malware** — Besucher werden auf schädliche Seiten weitergeleitet
- **Reputationsschaden** — Vertrauen aufbauen dauert Jahre, verlieren Sekunden
- **DSGVO-Bußgeld** — wenn personenbezogene Daten lecken und Sie keine angemessene Sicherheit haben

Die durchschnittlichen Kosten eines Datenlecks für ein kleines Unternehmen liegen bei ca. €25.000 — das ist keine US-Zahl, das gilt auch in den Niederlanden und Deutschland.

## Die Basis: 7 Sicherheitsmaßnahmen

### 1. HTTPS (SSL-Zertifikat)

Wenn Ihre Website noch auf `http://` statt `https://` läuft, ist das Ihre allererste Priorität.

HTTPS verschlüsselt die Verbindung zwischen dem Browser Ihres Besuchers und Ihrem Server. Ohne HTTPS kann jeder im selben WLAN-Netzwerk (denken Sie an ein Café) mitlesen — einschließlich Formulareingaben.

**So richten Sie es ein:** Die meisten Hosting-Anbieter bieten kostenloses SSL über Let's Encrypt. Aktivieren Sie es im Hosting-Panel. Wenn Ihnen jemand dafür Geld berechnet, suchen Sie einen anderen Anbieter.

**Status 2026:** Google Chrome markiert HTTP-Seiten aktiv als „Nicht sicher". Das schreckt Besucher ab und kostet Sie Rankings.

### 2. Security Header

Security Header sind Anweisungen, die Ihr Server mit jeder Seite mitsendet. Sie sagen dem Browser, wie er sich sicher verhalten soll. Die meisten Websites fehlen sie — und die meisten Webentwickler vergessen sie.

Die wichtigsten:

| Header | Was er tut |
|---|---|
| Strict-Transport-Security (HSTS) | Erzwingt HTTPS. Verhindert, dass jemand die erste Verbindung abfängt |
| X-Content-Type-Options | Verhindert, dass Browser Dateien als Skript ausführen |
| X-Frame-Options | Verhindert, dass Ihre Seite in einem iframe auf einer anderen Seite geladen wird |
| Referrer-Policy | Begrenzt, welche URL-Informationen an externe Seiten weitergegeben werden |
| Permissions-Policy | Blockiert Zugriff auf Kamera, Mikrofon und GPS, außer Sie erlauben es explizit |
| Content-Security-Policy | Bestimmt, welche Quellen (Skripte, Bilder) laden dürfen — der mächtigste, aber auch komplexeste |

**So richten Sie es ein:** Das sind vier Zeilen in Ihrer `.htaccess`-Datei oder Cloudflare-Konfiguration. Ihr Webentwickler kann das in fünf Minuten einrichten.

### 3. Updates aktuell halten

**WordPress-Seiten:** WordPress, Themes und Plugins erhalten regelmäßig Sicherheitsupdates. Jedes Update, das Sie aufschieben, ist eine offene Tür für Angreifer. Viele Hacks nutzen Schwachstellen aus, die seit Monaten gepatcht sind — aber nicht installiert wurden.

**Maßarbeit-Seiten:** Weniger dringende Updates, aber prüfen Sie regelmäßig, ob Ihre Server-Software (Node.js, PHP, Webserver) aktuell ist.

Automatische Updates sind ein zweischneidiges Schwert: Sie halten Sie sicher, können aber Dinge kaputt machen. Eine monatliche manuelle Prüfung ist ein guter Kompromiss.

### 4. Starke Passwörter und 2FA

Das klingt selbstverständlich, ist aber immer noch die Nr. 1 Ursache für gehackte Seiten:

- Admin-Passwort ist „willkommen123" oder der Firmenname
- Dasselbe Passwort für Hosting, E-Mail, CMS und Social Media
- Keine Zwei-Faktor-Authentifizierung (2FA)

**Mindestanforderungen:**
- Passwortmanager nutzen (Bitwarden ist kostenlos und gut)
- Jedes Konto hat ein einzigartiges Passwort mit mindestens 16 Zeichen
- 2FA überall aktivieren: Hosting, CMS, E-Mail, Domain-Registrar

### 5. Backups

Wenn etwas schiefgeht — Hack, Serverfehler, versehentlich gelöscht — wollen Sie zu einer funktionierenden Version zurück. Ohne Backup fangen Sie von vorn an.

**Was Sie brauchen:**
- Tägliches automatisches Backup von Dateien und Datenbank
- Backups an einem anderen Ort als Ihr Server gespeichert
- Mindestens 30 Tage aufbewahrt
- Getestet: Können Sie ein Backup tatsächlich wiederherstellen?

Die meisten Hosting-Anbieter bieten automatische Backups. Prüfen Sie, ob das aktiv ist und ob die Datenbank eingeschlossen ist.

### 6. Zugriff einschränken

Wer hat alles Zugang zu Ihrer Website, Ihrem Hosting und Ihrem Server?

- Entfernen Sie Konten ehemaliger Mitarbeiter und früherer Webentwickler
- Geben Sie nur die Rechte, die nötig sind (nicht jeder braucht Admin)
- Separate Konten pro Person — niemals ein geteiltes Passwort

### 7. Monitoring

Sie wollen wissen, wenn etwas schiefgeht — am liebsten, bevor ein Kunde es meldet.

**Was Sie überwachen können:**
- Ist die Seite online? (kostenlose Tools: UptimeRobot, Freshping)
- Wurden unbekannte Dateien hinzugefügt?
- Werden ungewöhnlich große Datenmengen übertragen?
- Hat Google Probleme gefunden? (Google Search Console)

Ein täglicher Uptime-Check und wöchentlicher Blick auf die Search Console kosten fünf Minuten und können große Probleme verhindern.

## Wie sicher ist Ihre Website jetzt?

Sie können Ihre Security Header kostenlos testen auf [securityheaders.com](https://securityheaders.com). Die Seite gibt eine Note von A+ bis F.

Die meisten KMU-Websites erreichen D oder F. Nicht weil sie unsicher gebaut sind, sondern weil Security Header einfach vergessen werden. Die gute Nachricht: Das ist schnell zu beheben.

## DSGVO und Sicherheit

Die DSGVO verpflichtet Sie, „angemessene technische Maßnahmen" zum Schutz personenbezogener Daten zu treffen.

Wenn Sie ein Kontaktformular haben, Newsletter-Anmeldungen speichern oder Kundenkonten verwalten, verarbeiten Sie personenbezogene Daten. Dann gelten diese Anforderungen:

- HTTPS ist Pflicht bei der Verarbeitung personenbezogener Daten
- Sie brauchen einen Auftragsverarbeitungsvertrag mit Ihrem Hosting-Anbieter
- Ihre Datenschutzerklärung muss angeben, welche Daten Sie verarbeiten und warum
- Bei einem Datenleck müssen Sie innerhalb von 72 Stunden die Aufsichtsbehörde informieren

Das ist keine Checkliste, um Sie Angst zu machen — es ist eine Checkliste, um Ihr Unternehmen zu schützen.

## Was kostet es?

| Maßnahme | Kosten | Zeitaufwand |
|---|---|---|
| SSL-Zertifikat | Kostenlos (Let's Encrypt) | 10 Minuten |
| Security Header einrichten | Kostenlos | 30 Minuten |
| Passwortmanager | Kostenlos (Bitwarden) | 1 Stunde einmalig |
| 2FA aktivieren | Kostenlos | 15 Minuten pro Konto |
| Automatische Backups | €0–€10/Monat | 30 Minuten einmalig |
| Uptime-Monitoring | Kostenlos (UptimeRobot) | 15 Minuten |
| Updates aktuell halten | Kostenlos (eigene Zeit) | 1 Stunde/Monat |

Gesamt: weniger als €10/Monat und ein halber Tag Arbeit. Vergleichen Sie das mit €25.000 durchschnittlichem Schaden bei einem Datenleck.

## Zusammenfassung

- 43 % der Cyberangriffe richten sich gegen KMU — Sie sind nicht zu klein
- HTTPS, Security Header und starke Passwörter sind die Basis
- Updates aktuell halten und Backups erstellen verhindern die meisten Probleme
- Monitoring kostet fünf Minuten pro Woche und kann Tausende Euro Schaden verhindern
- Die DSGVO verlangt „angemessene technische Maßnahmen" — dieser Artikel beschreibt sie

---

*Möchten Sie wissen, wie sicher Ihre Website ist? Bei ultimAItech scanne ich Ihre Seite auf Sicherheitslücken und richte Header und Konfiguration ein. [Fordern Sie einen Sicherheitscheck an →](https://ultimaitech.com/contact/?intent=security-audit)*
