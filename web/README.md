# Web Template

## Render Ways

### Static Mode (SPA)

By default app setuped for SPA mode

To switch to static

1. In `package.json` set scripts
   - `"build": "yarn build:static"`
   - `"serve": "yarn serve:static"`
2. In `nuxt.config.ts` change ssr on `false`
3. In root `.gitlab-ci.yml` set web job:

```yml
web:
  stage: app
  variables:
    WEB_DIR: web
    BACKEND_DIR: $WEB_DIR
    FRONTEND_DIR: $WEB_DIR
  trigger:
    include: $WEB_DIR/.static.gitlab-ci.yml
    strategy: depend
```

### Server Mode (SSR + backend)

To switch to server

1. In `package.json` set scripts
   - `"build": "yarn build:server"`
   - `"serve": "yarn serve:server"`
2. In `nuxt.config.ts` change ssr on `true`
3. In root `.gitlab-ci.yml` set web job:

```yml
web:
  stage: app
  variables:
    WEB_DIR: web
    BACKEND_DIR: $WEB_DIR
    FRONTEND_DIR: $WEB_DIR
  trigger:
    include: $WEB_DIR/.server.gitlab-ci.yml
    strategy: depend
```
