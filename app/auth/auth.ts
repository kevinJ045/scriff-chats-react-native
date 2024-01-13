import { loginURL } from "../common/url";



export function login(username: string, password: string, onSuccess = (data: any) => {}, onError = (error?: string) => {}){
	fetch(loginURL(username, password), {
		method: 'POST'
	}).then(r => r.json())
	.then(
		data => {
			if(data.failed){
				onError(data.response);
			} else {
				onSuccess({
					username,
					password,
					token: data.response.session
				})
			}
		}
	);
}