self.onmessage = (e) => {
    const { delay, id } = e.data;

    setTimeout( () => {
        self.postMessage( { id: id, delay: delay } );
    }, delay ); // Check again soon
};
