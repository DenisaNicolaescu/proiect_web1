# CONTEXT — proiect_web1 vocabulary

<!-- graffino-agentic:begin v1 -->
> The approved terms for this project. Use each term exactly as defined, in the part
> of speech given. Never swap in a synonym; never use a word on an _Avoid_ line.
<!-- graffino-agentic:end -->

**Client** (noun) — The browser runtime interface interacting with the end user.
_Avoid_: frontend app, consumer

**Server** (noun) — The backend service managing application logic, authentication, and persistence.
_Avoid_: backend box, host

**Endpoint** (noun) — A specific HTTP URL path and method exposed by the API.
_Avoid_: route handler, action URL

**View** (noun) — A visual page or full-screen template rendered in the browser.
_Avoid_: webpage, screen layout

**Mock** (noun) — A standalone HTML design artifact representing a proposed screen.
_Avoid_: wireframe, sketch

**Sesizare** (noun) — A documented civic problem report submitted with photo, GPS coordinates, category, and description within the neighborhood boundary.
_Avoid_: ticket, plângere, bug, issue generic

**SLA în zile lucrătoare** (noun) — The resolution deadline in Romanian working days assigned to a category, excluding weekends and official Romanian statutory holidays (including Orthodox Easter and Pentecost).
_Avoid_: deadline brut, timp calendaristic

**Duplicat** (noun) — A report submitted within 50 meters and 30 calendar days of an existing report under the same primary category.
_Avoid_: clonă, sesizare geamănă

**Fuziune reversibilă** (noun) — An operator workflow action merging a secondary duplicate report into a primary report that aggregates comments and followers while computing unique votes as COUNT(DISTINCT user_id), with full ability to unmerge without loss of original data or status history.
_Avoid_: merge distructiv, combinare definitivă

**Raportare opțional anonimă** (noun) — The mode allowing an authenticated user to conceal their real name and email from public views and exports (rendered as "Cetățean anonim") while retaining accountability in the database.
_Avoid_: guest submission, postare fără cont

**Vizitator** (noun) — An unauthenticated user who can view the map, the list, the sesizare detail, the public statistics and the exports, but cannot change anything. Not an account role; the account roles are Cetățean, Operator and Admin.
_Avoid_: guest, utilizator anonim

**Cetățean** (noun) — An authenticated end user from the neighborhood who can report issues, cast one vote per issue, comment, and follow status notifications.
_Avoid_: public user, regular user

**Operator** (noun) — An authenticated privileged user responsible for reviewing, triaging, transitioning workflow statuses, uploading resolution proof, and merging/unmerging duplicates.
_Avoid_: agent primărie, moderator, trior

**Admin** (noun) — An authenticated system administrator responsible for managing user roles, configuring categories, and setting SLAs in working days.
_Avoid_: webmaster, superuser, root

**Aria cartierului** (noun) — The closed polygon boundary encapsulating the surveyed streets of Cartierul Tineretului with a 50–100m buffer, outside of which pins and GPS reports are strictly rejected.
_Avoid_: perimetru general, raza orașului, zonă Sibiu
