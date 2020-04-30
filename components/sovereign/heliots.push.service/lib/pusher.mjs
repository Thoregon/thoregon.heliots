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

    push(channel, message, subject) {
        universe.logger.info('--> push', channel, message);

    }

    /*
     * service implementation
     */

    install() {}
    uninstall() {}
    resolve() {}
    start() {
        // todo: prepare 'subscriptions' for 'channels'
    }
    stop() {}
    update() {}
}

export default new Pusher();
