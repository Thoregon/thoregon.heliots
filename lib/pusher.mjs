/**
 *
 *
 * @author: Bernhard Lukassen
 */

import webPush      from '/web-push';

class Pusher {

    constructor() {
    }

    install() {}

    resolve() {}

    start() {
        webPush.setVapidDetails(
            universe.VAPID.subject,
            universe.VAPID.publicKey,
            universe.VAPID.privateKey
        );
        // setup subscription routes
    }

    stop() {
        // remove subscription routes
    }

    update() {}

    uninstall() {}
}

export default new Pusher();
