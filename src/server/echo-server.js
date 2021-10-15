import { EchoServer as BaseEchoServer } from 'laravel-echo-server/dist/echo-server';
import * as prometheus from 'socket.io-prometheus-metrics';

export default class EchoServer extends BaseEchoServer {
    run(options) {
        const promise = super.run(options);

        if (options.metrics.enabled) {
            prometheus.metrics(this.server.io, {
                collectDefaultMetrics: options.metrics.collectDefaultMetrics,
                path: options.metrics.path,
                port: options.metrics.port,
            });
        }

        return promise;
    }
}
