/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";

const heliotbc                      = 'heliots.service';            // name of the bounded context
const tru4d                         = universe.services.tru4d;

export default class Heliot extends Reporter(EventEmitter) {

    constructor() {
        super();
        this.wwwqueue = [];
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
        this.www = universe.www;
        this.connectAll();
        this.emit('ready', { heliot: this });
    }

    addServiceRoot(wwwserviceroot, ctxid) {
        if (this.www) {
            this.connect(wwwserviceroot, ctxid);
        } else {
            this.wwwqueue.push({ wwwserviceroot, ctxid });
        }
    }

    connectAll() {
        this.wwwqueue.forEach(({ wwwserviceroot, ctxid }) => {
            this.connect(wwwserviceroot, ctxid);
        })
    }

    connect(wwwserviceroot, ctxid) {
        if (this.www.has(wwwserviceroot)) {
            this.logger.warn(`serviceroot '${wwwserviceroot}' already occupied.`);
            return;     // todo: better throw? check
        }
        let wwwroot = this.www.root(wwwserviceroot);
        wwwroot.post('subscribe', async (req, res, data, utils) => {
            let subscription    = data.content.subscription;
            let channel         = data.content.channel;
            if (channel) subscription.channel = channel;

            let createsubscription = tru4d.context(ctxid).commands.CreateSubscriptionCommand(subscription);
            await createsubscription.commit();

            // todo: get the result by listening to the domain event
            res.send('ACK');
        });
        wwwroot.post('unsubscribe', async (req, res, data, utils) => {
            let subscription    = { subscription: data.content.subscription, channel: data.content.channel };
            let channel         = data.content.channel;
            if (channel) subscription.channel = channel;

            let deletesubscription = await tru4d.context(ctxid).commands.DeleteSubscriptionCommand();
            await deletesubscription.useKey(subscription);
            await deletesubscription.commit();

            // todo: get the result by listening to the domain event
            res.send('ACK');
        });

    }
}
