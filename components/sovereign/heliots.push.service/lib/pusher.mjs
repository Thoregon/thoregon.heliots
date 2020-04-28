/**
 *
 *
 * @author: Bernhard Lukassen
 */

import webPush      from '/web-push';

class Pusher {

    constructor() {
        this.init();
    }

    init() {
        webPush.setVapidDetails(
            universe.VAPID.subject,
            universe.VAPID.publicKey,
            universe.VAPID.privateKey
        );
        // setup subscription routes
    }

    /*
     * Push
     */

    push(topic, message) {
        universe.logger.info('--> push', topic, message);
    }
}

export default new Pusher();
