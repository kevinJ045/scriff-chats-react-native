

export function getFrom(url = "", token = ""){
	return fetch(url, { headers: { token } })
	.then(r => r.json());
}