var tld = {};

tld.timeoutWorker = new Worker( 'tldialer-timeout-worker.js' );

tld.timeoutWorker.confirmed = 0;

tld.timeoutWorker.onmessage = function (e) {
    if( tld.timeoutWorker.confirmed === 0 ){
        tld.timeoutWorker.confirmed = 1;
        console.log( 'Using TLDialer Timeout WebWorker');
    }

    const { id } = e.data;
    
    if (typeof window[id] === 'function') 
        return window[id]();
    
    console.error(`Function ${id} does not exist.`);
};

tld.setTimeoutWorker = function(delay, id) {
    tld.timeoutWorker.postMessage( { delay, id } );
};
