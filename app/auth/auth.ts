import { loginURL } from "../common/url";



export function login(username: string, password: string, onSuccess = (data: any) => {}, onError = () => {}){
	fetch(loginURL(username, password), {
		method: 'POST'
	}).then(r => r.json())
	.then(
		data => {
			if(data.failed){
				onError();
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