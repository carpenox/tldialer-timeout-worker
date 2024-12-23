# tldialer-timeout-worker
TLDialer Timeout Worker for VICIDial

# What does this do?

It puts the `all_refresh()` function whcih the VICI frontend uses to manage agent state into a WebWorker which runs as a unthrottled background thread separate from the main thread to prevent setTimeout getting Throttled in Chrome.

Unlike VICIDials EventSource solution, it doesn't require a ridiculous 1 call per second to their `agc/sse.php` file to make a fake websocket connection to manage the timer and bypass Chromes `setTimeout` restrictions.

So what it does is it makes it so VICI Doesn't Pause a persons session while they are still on a call while in another tab or with VICI minimized, making it appear like the agent is dead or paused even though a call is still going. 

It also prevents VICI from clearing out the callerid in `vicidial_live_agents` as well which causes all sorts of other issues including logging. Ever heard of an agent saying that they appear dead or paused even though the call is still going? This is why. 

It's a purely JS solution, so there shouldn't be any extra load on the servers outside the initial load of the JS Files. 

# Instructions

Put both tldialer.js and tldialer-timeout-worker.js in your `vicidial/agc` directory

Add tldialer.js to load as the first script in your `<head>` `<script src="/agc/tldialer.js" type="text/javascript></script>`

Optionally, you can paste tldialer.js code within script tags `<script type="text/javascript>{{tldialer.js code goes here}}</script>` in the head. 

At Esotech / TLDCRM We have a custom injection loader for vicidial.php that does this automatically so we can avoid touching the core code. It basically grabs vicidial.php and does string replaces for the injections before serving the file, but it's not needed for this part of our mods.

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

