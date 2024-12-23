var tld = {};

tld.timeoutWorker = new Worker( 'tldialer-timeout-worker.js' );

tld.timeoutWorker.confirmed = 0;

tld.timeoutWorker.onmessage = function (e) {
    if( tld.timeoutWorker.confirmed === 0 ){
        tld.timeoutWorker.confirmed = 1;
        console.log( 'Using TLDialer Timeout WebWorker');
    }
    
    const { callback } = e.data;

    if (typeof window[callback] === 'function') 
        return window[callback]();
    
    console.error(`Function ${callback} does not exist.`);
};

tld.setTimeoutWorker = function( callback, delay ) {
    tld.timeoutWorker.postMessage( { callback, delay } );
};

window.setTimeout = tld.setTimeoutWorker;
