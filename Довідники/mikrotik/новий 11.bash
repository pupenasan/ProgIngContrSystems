# Moved Temporarily 302.  fetch to gasfetchout.txt
:global URL "https://script.google.com/macros/s/AKfycbya3Eqh6Gw-Mu_ksOtHoxUw988ic6eey67ZelRoi_VYhEDN4zidyeLocPdmrSDdWLEB/exec"
:local jobid [\
	:execute script={\
		/tool fetch \
		http-method=post http-header-field="Content-Type: application/json" \
		http-data="{\"device\":\"router\", \"msg\":\"Router init\"}" \
		url=$URL\
		} \
	file=gasfetchout.txt]

# Wait end of task
:while ([:len [/system script job find .id=$jobid ]] > 0) do={ delay 1s }

# parse gasfetchout.txt, get URL
:local fetchOut [/file get gasfetchout.txt contents]
:local startURL [:find $fetchOut "http" -1]
:local endURL [:find $fetchOut "\"> " startURL]
:set URL [:pick $fetchOut $startURL $endURL]

# send first message
/tool fetch \
	http-method=post http-header-field="Content-Type: application/json" \
	http-data="{\"device\":\"router\", \"msg\":\"Router started\"}" \
	url=$URL 
