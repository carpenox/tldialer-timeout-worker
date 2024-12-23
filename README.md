# tldialer-timeout-worker
TLDialer Timeout Worker for VICIDial

# Instructions

Put both tldialer.js and tldialer-timeout-worker.js in your `vicidial/agc` directory

Replace the following line in vicidial.php
`		if(typeof(EventSource) !== "undefined")`

with 
`if( tld.timeoutWorker instanceof Worker && typeof( tld.setTimeoutWorker ) === 'function' ){
			tld.setTimeoutWorker( refresh_interval, 'all_refresh' );
		} else if(typeof(EventSource) !== 'undefined')`
