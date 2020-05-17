/**
 * Heliots webservice for browser subscriptions
 *
 * todo:
 *  - introduce superclass for webservices
 *  - add convention/configuration for dependencies/optional features, swagger generator
 *
 * @author: Bernhard Lukassen
 */

import { RestFull}                  from "/evolux.web";

export default class Heliots extends RestFull {

    connect(wwwroot, ctxid) {
        const tru4d     = universe.services.tru4d;
        const bc        = tru4d.context(ctxid);

        wwwroot.post('subscribe', async (req, res, data, utils) => {
            let subscription    = data.content.subscription;
            let channel         = data.content.channel;
            if (channel) subscription.channel = channel;

            let createsubscription = bc.commands.CreateSubscriptionCommand(subscription);
            await createsubscription.useKey(subscription);
            await createsubscription.commit();

            // todo: get the result by listening to the domain event
            res.send('ACK');
        });
        wwwroot.post('unsubscribe', async (req, res, data, utils) => {
            let subscription    = data.content.subscription;
            let channel         = data.content.channel;
            if (channel) subscription.channel = channel;

            let deletesubscription = bc.commands.DeleteSubscriptionCommand();
            await deletesubscription.useKey(subscription);
            await deletesubscription.commit();

            // todo: get the result by listening to the domain event
            res.send('ACK');
        });

    }
}
