/**
 *
 *
 * @author: Bernhard Lukassen
 */

export const urlBase64ToUint8Array = (base64String) => {
    let padding = '='.repeat((4 - base64String.length % 4) % 4);
    let base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

export const subscribe = async (channel) => {
    let registration = await navigator.serviceWorker.ready;

    // Get the server's public key
    const response = await fetch('/vapidPublicKey');
    const vapidPublicKey = await response.text();
    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
    // urlBase64ToUint8Array() is defined in /tools.js
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    // Subscribe the user
    let subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    });

    universe.logger.debug('Subscribed', subscription.endpoint);
    let payload = { subscription: subscription };
    if (channel) payload.channel = channel;
    let res = await fetch('/heliot/subscribe', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`can't subscribe: ${res.status} - ${res.statusText}`);
    return subscription;
};

export const unsubscribe = async (channel) => {
    let registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    await subscription.unsubscribe();

    universe.logger.debug('Unsubscribed', subscription.endpoint);
    let payload = { subscription: subscription };
    if (channel) payload.channel = channel;
    let res = await fetch('/heliot/unsubscribe', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`can't subscribe: ${res.status} - ${res.statusText}`);
    // return subscription;
};
