// /home/syd/work/ecosystem.config.js
//
// Paper / پایگاه دانش — PM2 config for this server.
//
//   cd /home/syd/work
//   pm2 startOrReload ecosystem.config.js --update-env
//   pm2 save
//
// `startOrReload` is idempotent: running apps are reloaded, stopped apps are
// started. Re-running it never duplicates processes.

const FNM_BIN = '/home/syd/.local/share/fnm/aliases/default/bin';
const DENO_BIN = '/home/syd/.deno/bin';

// Backend CORS (back/mod.ts) and Next image domains (web/next.config.ts) have
// been updated for this IP. Update all three places if the host changes.
const PUBLIC_HOST = '94.184.45.192';

const SYSTEM_PATH =
  '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin';
const PATH_DENO = `${DENO_BIN}:${FNM_BIN}:${SYSTEM_PATH}`;
const PATH_NODE = `${FNM_BIN}:${SYSTEM_PATH}`;

module.exports = {
  apps: [
    // ───────────────────────── Backend (Deno) ─────────────────────────
    // Port 1382 is hardcoded in back/mod.ts. cwd MUST stay on back/ because
    // uploads are written to ./uploads and served from there.
    //
    // Secrets are NOT in this file. They come from /home/syd/work/paper.env:
    //   ENV=development
    //   TOKEN_KEY=<strong random value>
    //   TOKEN_KEY_PREVIOUS=<optional, for key rotation>
    //
    // ENV is `development` because sendSms() in
    // src/user/loginReq/loginReqUser.fn.ts is an empty stub: with
    // ENV=production OTP codes are generated but never delivered, so nobody
    // can log in. Development mode uses the fixed code `11111`, which is NOT
    // safe on a public server. Implement SMS and switch ENV to production.
    {
      name: 'paper-BC',
      cwd: '/home/syd/work/paper/back',
      script: 'mod.ts',
      interpreter: `${DENO_BIN}/deno`,
      interpreter_args: 'run -A --env-file=/home/syd/work/paper.env',
      env: {
        PATH: PATH_DENO,
      },

      // typeGeneration rewrites declarations on boot; keep one fork instance.
      instances: 1,
      exec_mode: 'fork',

      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      kill_timeout: 5000,
      max_memory_restart: '1G',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },

    // ──────────────────────── Frontend (Next.js) ──────────────────────
    // Build before starting/reloading:
    //   cd /home/syd/work/paper/web
    //   LESAN_URL=http://94.184.45.192:1382 ./node_modules/.bin/next build
    //
    // LESAN_URL is also used by the browser for uploads and file links, so it
    // must be the public backend URL, not 127.0.0.1.
    {
      name: 'paper-FR',
      cwd: '/home/syd/work/paper/web',
      script: './node_modules/next/dist/bin/next',
      args: 'start --port 3000 --hostname 0.0.0.0',
      interpreter: `${FNM_BIN}/node`,
      env: {
        PATH: PATH_NODE,
        NODE_ENV: 'production',
        PORT: 3000,
        LESAN_URL: `http://${PUBLIC_HOST}:1382`,
      },

      instances: 1,
      exec_mode: 'fork',

      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      kill_timeout: 5000,
      max_memory_restart: '1G',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
