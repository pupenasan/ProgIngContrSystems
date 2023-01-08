# Start
:global URL "https://script.google.com/macros/s/AKfycbx9mJs3KBOYhcIb7p6RbZ7V2OHksUGhpAQpZ2qrMLvoB5eFowWhiXdqPaE8Irwj-AgA/exec"
:local jobid [\
	:execute script={\
		/tool fetch \
		http-method=post http-header-field="Content-Type: application/json" \
		http-data="{\"device\":\"router\", \"msg\":\"Router init\"}" \
		url=$URL\
		} \
	file=gasfetchout.txt]

