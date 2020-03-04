import {
    cleanEnv,
    port,
    url,
    str,
    bool,
    makeValidator,
} from 'envalid';

const optionalString = makeValidator((input) => {
    if (input == null || typeof input === 'string') {
        return input;
    }

    throw new Error('Must be a string or left unset');
});

const validEnv = cleanEnv(process.env, {
    AUTH_HOST: url({
        desc: 'The host of the server that authenticates private and presence channels',
    }),

    AUTH_ENDPOINT: str({
        default: '/broadcasting/auth',
        desc: 'The route that authenticates private channels',
    }),

    ENABLE_HTTP: bool({
        default: true,
        desc: 'Enable HTTP subscriber',
    }),

    ENABLE_REDIS: bool({
        default: true,
        desc: 'Enable Redis subscriber',
    }),

    DATABASE: str({
        default: 'redis',
        choices: ['sqlite', 'redis'],
        desc: 'Database to store presence channels data',
    }),

    REDIS_HOST: optionalString({
        default: null,
        desc: 'Redis host',
    }),

    REDIS_PORT: port({
        default: 6379,
        desc: 'Redis port',
    }),

    REDIS_PASSWORD: optionalString({
        default: undefined,
        desc: 'Redis password',
    }),

    SQLITE_DB_PATH: str({
        default: '/database/laravel-echo-server.sqlite',
        desc: 'SQLite database path'
    }),

    ALLOW_CORS: bool({
        default: false,
        desc: 'Enable CORS',
    }),

    ALLOW_ORIGIN: str({
        default: '',
        desc: 'Access control allowed origins'
    }),

    ALLOW_METHODS: str({
        default: 'Access control allowed methods',
    }),

    ALLOW_HEADERS: str({
        default: 'Access control allowed headers',
    }),

    DEV_MODE: bool({
        default: false,
        desc: 'Turn on development mode',
    })
}, {
    strict: true,
})

export const {
    AUTH_HOST,
    AUTH_ENDPOINT,
    ENABLE_HTTP,
    ENABLE_REDIS,
    DATABASE,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    SQLITE_DB_PATH,
    ALLOW_CORS,
    ALLOW_ORIGIN,
    ALLOW_METHODS,
    ALLOW_HEADERS,
    DEV_MODE,
} = validEnv;
