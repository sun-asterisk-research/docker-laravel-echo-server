# docker-laravel-echo-server

Docker image for [Laravel Echo server](https://github.com/tlaverdure/laravel-echo-server).

## Usage

Pull the image

```sh
docker pull sunasteriskrnd/laravel-echo-server
```

Start a container

```sh
docker run -e REDIS_HOST=<redis server host> sunasteriskrnd/laravel-echo-server
```

### Environment variables

You must set the `AUTH_HOST` environment variable if you want to use private or presence channels.

`REDIS_HOST` is required when you enable Redis subscriber (yes by default)
or you use Redis for as database to store presence channels data (yes by default).

See [below](#configuration) for a full list of environment variables.

### API Client

If you want to use the HTTP subscriber, you must create an [API client](https://github.com/tlaverdure/laravel-echo-server#api-clients).
You can mount a `laravel-echo-server.json` file into the container and run the `client:add` command to create an one.

```sh
docker run -v <your laravel-echo-server.json>:/laravel-echo-server/laravel-echo-server.json \
    sunasteriskrnd/laravel-echo-server laravel-echo-server client:add
```

You can see your created client ID and Key by viewing your file.
Note that your file must be a valid JSON file. You can create an empty one with.

```sh
echo "{}" > laravel-echo-server.json
```

### SQLite

If you want to use SQLite as your database to store presence channels data, mount an SQLite DB file in the path
you chose for `SQLITE_DB_PATH` (default is `/database/laravel-echo-server.sqlite`).

```sh
docker run -v <your sqlite db file>:/database/laravel-echo-server.sqlite \
    -e DATABASE=sqlite \
    sunasteriskrnd/laravel-echo-server
```

## Configuration

The image is configurable via environment variables.

| Variable                  | Default                                | Derscription                                                                   |
|---------------------------|----------------------------------------|--------------------------------------------------------------------------------|
| `HOST`                    | `null`                                 | The host of the socket.io server                                               |
| `PORT`                    | `6001`                                 | The port that the socket.io server should run on                               |
| `AUTH_HOST`               |                                        | The host of the server that authenticates private and presence channels        |
| `AUTH_ENDPOINT`           | `/broadcasting/auth`                   | The route that authenticates private channels                                  |
| `ENABLE_HTTP`             | `true`                                 | Enable HTTP subscriber                                                         |
| `ENABLE_REDIS`            | `true`                                 | Enable Redis subscriber                                                        |
| `DATABASE`                | `redis`                                | Database used to store presence channels data                                  |
| `REDIS_HOST`              | `localhost`                            | Redis server host                                                              |
| `REDIS_PORT`              | `6379`                                 | Redis server port                                                              |
| `REDIS_PASSWORD`          | `null`                                 | Redis server password                                                          |
| `REDIS_KEY_PREFIX`        | `''`                                   | Prefix for Redis keys. Should match your Laravel app's Redis config            |
| `SQLITE_DB_PATH`          | `/database/laravel-echo-server.sqlite` | SQLite database path (relative to `/laravel-echo-server`, must start with `/`) |
| `ALLOW_CORS`              | `false`                                | Allow CORS                                                                     |
| `ALLOW_ORIGIN`            | `''`                                   | Access-Control-Allow-Origin Header                                             |
| `ALLOW_METHODS`           | `''`                                   | Access-Control-Allow-Methods Header                                            |
| `ALLOW_HEADERS`           | `''`                                   | Access-Control-Allow-Headers Header                                            |
| `ENABLE_METRICS`          | `false`                                | Enable metrics endpoint for Prometheus                                         |
| `COLLECT_DEFAULT_METRICS` | `false`                                | Collect default Prometheus metrics                                             |
| `METRICS_PATH`            | `/metrics`                             | Metrics path                                                                   |
| `METRICS_PORT`            | `9090`                                 | Metrics port                                                                   |
| `DEV_MODE`                | `false`                                | Adds additional logging for development purposes                               |
