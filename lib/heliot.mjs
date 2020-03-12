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
        let wwwroot = www.root(serviceroot);
        wwwroot.post('subscribe', async (req, res, data, utils) => {
            let subscription    = data.content.subscription;
            let channel         = data.content.channel;
            if (channel) subscription.channel = channel;

            let createsubscription = new universe.dddd.commands.thoregon.heliots.service.CreateSubscriptionCommand(subscription);
            await createsubscription.commit();

            // todo: get the result by listening to the domain event
            res.send('ACK');
        });
        wwwroot.post('unsubscribe', async (req, res, data, utils) => {
            let subscription    = { subscription: data.content.subscription, channel: data.content.channel };
            let channel         = data.content.channel;
            if (channel) subscription.channel = channel;

            let deletesubscription = await universe.dddd.commands.thoregon.heliots.service.DeleteSubscriptionCommand.useKey(subscription);
            await deletesubscription.commit();

            // todo: get the result by listening to the domain event
            res.send('ACK');
        });

        this.emit('ready', { heliot: this });
    }
}
