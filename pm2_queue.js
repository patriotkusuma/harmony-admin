// /var/www/your_laravel_app/pm2_dev_server.js
module.exports = {
  apps : [{
    name      : 'laravel-dev-server',
    script    : 'npm',
    args      : ['run', 'dev'],
    exec_mode : 'fork', // 'fork' adalah yang paling umum untuk ini
    watch     : false, // PM2 watch bisa mengganggu, biarkan Vite/Mix yang watch
    cwd       : '/home/patriot/harmony',
    env: {
        "NODE_ENV": "development"
    }
  }]
};