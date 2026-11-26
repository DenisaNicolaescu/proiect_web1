# Open questions · DS-003 reporting: form fields and limits

> Index and rules: [OPEN-QUESTIONS.md](../OPEN-QUESTIONS.md).

## Q-020 · Does a sesizare have a title, and who writes it?
- **Status:** answered
- **Blocks:** the DS-003 form, the sesizare data model
- **Who answers:** project owner
- **Context:** DS-002 (approved) shows a title as the page heading, taken from Field.md. The brief lists only category, description, photo, location and "opțional anonim" for reporting, and the old DS-003 draft had no title field.
- **Proposed answer:** A required "Titlu" field in the form, as in Field.md; DS-002 stays as it is. Length limit: Q-022.
- **Answer:** The proposed answer, accepted by the owner: the reporter writes a required title.
- **Date:** 2026-11-26
- **Note (2026-11-26):** Recorded in D-013, now D-014, with the other fields of the form.

## Q-021 · Where does the street of a new sesizare come from?
- **Status:** answered
- **Blocks:** the DS-003 form, the "Adresă" line of DS-002
- **Who answers:** project owner
- **Context:** DS-002 shows "Adresă: <stradă>, Cartierul Tineretului, Sibiu"; Field.md has a street for every report; no decision says how the street is found when a citizen reports.
- **Proposed answer:** A required free-text field "Stradă sau reper", written by the reporter; no reverse geocoding service. The pin stays the source of the location.
- **Answer:** The proposed answer, accepted by the owner.
- **Date:** 2026-11-26
- **Note (2026-11-26):** Superseded by D-013 (the street chosen from a list of the area's streets and deduced from the pin; the reper a separate, optional free-text field), then by D-014 (a text field with suggestions instead of the list).

## Q-022 · What are the length limits of the text fields, and which photos does the upload accept?
- **Status:** investigating
- **Blocks:** validation messages and hints on DS-003, server validation
- **Who answers:** project owner
- **Context:** No decision gives a maximum length for the title, the description or the reper, nor the photo formats, maximum file size or number of photos. The old DS-003 draft showed "0 / 500" for the description and ".jpg, .png, .heic"; neither value was approved. D-002 includes heic-convert, so HEIC is expected; the brief says "poză" (one).
- **Proposed answer:** _none yet_; DS-003 shows no limit until this is answered.
