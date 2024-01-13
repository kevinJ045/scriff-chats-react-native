import { io } from "socket.io-client";
import { baseURL } from "./url";

const socketConnect = (token?: string) => {
	const socket = io(baseURL, {
		extraHeaders: { [token ? 'token' : 'no_token']: token || "" },
	});
	socket.connect();
	return socket;
}

export { socketConnect };