sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a note and clicks "Save"

    Note right of browser: spa.js handles the form submit event,<br/>prevents default page reload,<br/>and adds the note to the local notes list

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Server saves the new note
    server-->>browser: HTTP 201 Created { message: "note created" }
    deactivate server

    Note right of browser: No redirect, no reload.<br/>The browser already updated the UI<br/>with the new note locally.