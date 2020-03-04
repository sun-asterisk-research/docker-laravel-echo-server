let config;

try {
    config = require('../laravel-echo-server.json');
} catch {
    config = {};
}

export default config.clients || [];
