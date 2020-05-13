/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { forEach }      from "/evolux.util";

import Action           from "/thoregon.tru4D/lib/action/action.mjs";

export default class PushMessageAction extends Action {

    async exec(command, payload, control, bc) {
        let {
            channel,
            subject,
            content
        } = payload;
        let vapidKeys = universe.VAPID;

        // prepare web push

        // build notification

        // get subscriptions for 'channel'
        let collection      = await bc.getCollection('subscriptions');
        let subscriptions   = await collection.list;

        // send notification
        await forEach(subscriptions, async (subscription) => {
            universe.logger.info('[PushMessageAction]', subscription);
        })
    }

}
