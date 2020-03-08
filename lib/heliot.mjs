/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";

const serviceroot = 'heliot';       // todo: add setting in universe

export default class Heliot extends Reporter(EventEmitter) {

    constructor() {
        super();
    }

    /*
     * EventEmitter implementation
     */

    get publishes() {
        return {
            ready:          'Component controller ready',
            exit:           'Component controller exit',
        };
    }

    /*
     * service implementation
     */

    install() {}
    uninstall() {}
    resolve() {}
    start() {
        const services              = universe.services;
        const components            = services.components;

        // todo: add convention/configuration for dependencies/optional features
        if (components) {
            components.observe({
                observes:   'web',
                forget:     true,           // do just once, forget after execution
                installed:  () => this.establishwebservice()
            });
        }
    }
    stop() {
        delete universe.www;
        this.emit('exit', { heliot: this });
    }

    update() {}

    // service helpers
    establishwebservice() {
        let www  = universe.www;
        if (www.has(serviceroot)) {
            this.logger.warn(`serviceroot '${serviceroot}' already occupied.`);
            return;
        }
        let root = www.root(serviceroot);
        root.get('subscribe/:id', (req, res, data, utils) => {
            this.logger.info('heliots', 'subscribe', data);
            let createsubscription = universe.dddd.commands.thoregon.heliots.service.CreateSubscriptionCommand;

            res.send('ACK');
        });

        this.emit('ready', { heliot: this });
    }
}
