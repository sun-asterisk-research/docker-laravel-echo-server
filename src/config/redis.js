import {
    cleanEnv,
    host,
    port,
    str,
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
    keyPrefix: env.REDIS_KEY_PREFIX,
};
