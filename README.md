# tldialer-timeout-worker
TLDialer Timeout Worker for VICIDial

# Instructions

Put both tldialer.js and tldialer-timeout-worker.js in your `vicidial/agc` directory

Add tldialer.js to load as the first script in your `<head>` `<script src="/agc/tldialer.js" type="text/javascript></script>`

Optionally, you can paste tldialer.js code within script tags `<script type="text/javascript>{{tldialer.js code goes here}}</script>` in the head. We have a custom injection loader for vicidial.php that does this automatically so we can avoid touching the core code. It basically grabs vicidial.php and does the injections, but it's not needed for this.

Replace the following line in vicidial.php

```
		if(typeof(EventSource) !== "undefined")
```

with 

```
		if( tld.timeoutWorker instanceof Worker && typeof( tld.setTimeoutWorker ) === 'function' ){
			tld.setTimeoutWorker( refresh_interval, 'all_refresh' );
		} else if(typeof(EventSource) !== 'undefined')
```

Which is around line 20483 depending on the version of VICI you have.

