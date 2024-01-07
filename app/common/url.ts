

export const baseURL = "http://scriff.onrender.com";
// export const baseURL = "http://192.168.0.106:3333";

export const loginURL = (username: string, password: string) => `${baseURL}/login/${username}?pwd=${password}&notokensave=true`;
export const whoamiURL = `${baseURL}/whoami`;