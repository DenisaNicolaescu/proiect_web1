# Architecture — proiect_web1

<!-- graffino-agentic:begin v1 -->
> How this repo is built, generated from the code at backfill and kept current by
> whoever changes the structure. The code wins: when this page is wrong, fix it.
<!-- graffino-agentic:end -->

## Overview
Web application project for university coursework. The structure will encompass client-facing user interfaces and server-side endpoints once initialized.

```text
[Browser / Client] <---> [Web Server / API] <---> [Storage / Database]
```

## Parts
| Part | Path | Responsibility | Talks to |
|---|---|---|---|
| Client | `src/client/` (pending) | UI rendering and user interaction | Server |
| Server | `src/server/` (pending) | API endpoints, business logic, persistence | Client, Database |

## Data flow
1. User interaction in browser triggers HTTP request to server.
2. Server validates input and processes business logic.
3. Server returns response to client for rendering.

## State and storage
| What | Where | Owner | Notes |
|---|---|---|---|
| View State | Client memory | Browser | Local component state |
| Persistence | Database / Files | Server | Configured upon feature build |

## Configuration
| Name | Where set | Used by | Notes |
|---|---|---|---|
| PORT | `.env` | Server | Application listening port |

## Build, deploy, runtime
Runs in local web development environment. Commands and dependencies will be configured in `package.json`.

## Boundaries
- Client/Server network boundary via HTTP APIs.
