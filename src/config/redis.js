import {
    cleanEnv,
    host,
    port,
    str,
    num,
    makeValidator,
    EnvError,
} from 'envalid';

const optionalString = makeValidator((input) => {
    if (input == null || typeof input === 'string') {
        return input || '';
    }

    throw new EnvError('Must be a string or left unset');
});

const env = cleanEnv(process.env, {
    REDIS_HOST: host({
        default: undefined,
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

    REDIS_DB: num({
        default: 1,
        desc: 'Redis database index to use',
    }),

    REDIS_KEY_PREFIX: str({
        default: '',
        desc: 'Redis key prefix',
    }),
}, {
    strict: true,
})

export default {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    db: env.REDIS_DB,
    keyPrefix: env.REDIS_KEY_PREFIX,
};
