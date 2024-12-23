self.onmessage = ( e ) => {
    let { callback, delay } = e.data;
    
    if( typeof( callback ) === 'string' )
        callback = callback.replace( /\(\)$/, '' );

    setTimeout( () => {
        self.postMessage( { callback: callback, delay: delay } );
    }, delay ); // Check again soon
};
