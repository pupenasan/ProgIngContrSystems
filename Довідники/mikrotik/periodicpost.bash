# send periodic message
:local upTime1 [/system resource get uptime];
:global httpdata1 ("{\"device\":\"router\", \"msg\":\"" . $upTime1 . "\"}");
:execute script={\
	/tool fetch \
	http-method=post \
	http-header-field="Content-Type: application/json" \
	http-data=$httpdata1  \
	url=$URL\
	}

