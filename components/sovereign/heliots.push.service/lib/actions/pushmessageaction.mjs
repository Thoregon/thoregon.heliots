/**
 *
 *
 * @author: Bernhard Lukassen
 */

import Action           from "/thoregon.tru4D/lib/action/action.mjs";

export default class PushMessageAction extends Action {

    exec(command, payload, control, bc) {
        let {
            channel,
            subject,
            content
        } = payload;
        let vapidKeys = universe.VAPID;

        // prepare web push

        // build notification

        // get subscriptions for 'channel'

        // send notification
    }

}