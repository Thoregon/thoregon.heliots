/**
 * A private end 2 end encrypted communication channel
 *
 * {
 *     t͛: <thoregon metadata>
 *     owner: <owner_pubkey>,   // this is not a user public key, this key is unique and the keypair is available for the admin in its member entry
 *     salt: <salt>,
 *     members: {
 *         <user_pubkey_hash>: { nickname: '', icon: '', sharedkey: ''}, // the content is encrypted, can be decrypted with the owner pub key and the users priv key
 *     }
 *     messages: [   // the content is encrypted with the shared secret key available for all members
 *         ...<message>>
 *     ]
 * }
 *
 * @author: Bernhard Lukassen
 */

import Store        from "./store.mjs";

import { ErrChatExists, ErrChatExistsNot, ErrNotAuthenticated } from "./errors.mjs";

const rnd       = universe.random;
const everblack = universe.Gun.SEA;

export default class Channel extends Store {

    /*
     * establish and connect
     */


    /**
     *
     * create does join automatically
     * @return {Promise<void>}
     */
    async create() {
        if (await this.is()) throw ErrChatExists();
        if (!universe.Identity.is) throw ErrNotAuthenticated();
        let ownerpair = await everblack.pair(),
            identity  = universe.identity,
            shared    = rnd(64);    // this shared key gets encrypted with a shared secret between owner and invited
        members[idhash] = {
            // encrypt
        }
        let channel = {
            owner   : ownerpair.epub,
            members : {},
            messages: {},
        };
        channel[T] = tmeta;

        this.channel = channel;
        // this.shared  = shared;
        // make persistent
        this.node   = channel;

        let member  = await addOwner(identity, ownerpair, shared);
        this.owner  = member;
        this.member = member;
    }

    async is() {
        if (this.channel) return true;
        let channel = await this.node.val;
        if (channel) {
            this.channel = channel;
            return true;
        }
        return false;
    }

    async join() {
        if (!await this.is()) throw ErrChatExistsNot();
        if (!universe.Identity.is) throw ErrNotAuthenticated();
        let identity = universe.identity;
        let members = await this.node.members.val;
        if (!members) throw ErrNotAuthenticated();
        let secret = identity.sharedSecret(this.channel.owner),
            idhash = await everblack.work(identity.pub, secret);    // user can only identify himself
        let signed = members[idhash];
        if (!signed) throw ErrNotAuthenticated();
        let enc = await everblack.verify(signed, this.channel.owner);   // verify with the owner pubkey
        if (!enc) throw ErrNotAuthenticated();
        let member = await everblack.decrypt(enc, secret);
        if (!member) throw ErrNotAuthenticated();
        if (member.ownerpair) {
            this.owner = member;
        }
        this.member = member;
    }

    /**
     *
     * @param {Identity} identity
     * @param {keypair}  [ownerpair]
     * @param {key}      [sharedkey]
     */
    async addOwner(identity, ownerpair, sharedkey) {
        if (!await this.is()) throw ErrChatExistsNot();
        // todo [OPEN: check if ownerpair epub matches stored

        // encrypt the entry with the channel pubkey and the users pair
        let secret = identity.sharedSecret(this.channel.owner),
            idhash = await everblack.work(identity.pub, secret),    // user can only identify himself
            member = {
                alias: identity.alias,
                sharedkey,
                ownerpair
            };

        // encrypt member
        let enc    = await everblack.encrypt(member, secret);
        let signed = await everblack.sign(enc, ownerpair);

        // make encrypted signed entry persistent
        this.node.members[idhash] = signed;

        return member;
    }

    /**
     *
     * @param {Identity} identity
     */
    async addMember(identity) {
        if (!await this.is()) throw ErrChatExistsNot();
        if (!this.owner) throw ErrNotAuthenticated();

        // encrypt the entry with the channel pubkey and the users pair
        let secret = identity.sharedSecret(this.channel.owner),
            idhash = await everblack.work(identity.pub, secret),    // user can only identify himself
            member = {
                alias    : identity.alias,
                sharedkey: this.owner.sharedkey
            };


        // encrypt member
        let enc    = await everblack.encrypt(member, secret);
        let signed = await everblack.sign(enc, this.owner.ownerpair);

        // make encrypted signed entry persistent
        this.node.members[idhash] = signed;

        return member;
    }

    /**
     * invite a user by its DID, nickname or public key
     * @param identifier
     */
    invite(identifier) {

    }

    /*
     * messages handling
     */

    push(message) {
        if (!universe.Identity.is) throw ErrNotAuthenticated();
        let user = universe.identity;
    }

    messages() {

    }

    /**
     * listens to arriving messages
     * includes all previous messages
     * @param fn
     */
    onMessage(fn) {

    }



}
