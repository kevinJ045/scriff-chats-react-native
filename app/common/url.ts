

// export const baseURL = "http://scriff.onrender.com";
export const baseURL = "http://192.168.0.106:3333";

export const loginURL = (username: string, password: string) => `${baseURL}/login/${username}?pwd=${password}&notokensave=true`;
export const whoamiURL = `${baseURL}/whoami`;

export const allChatsNamesURL = `${baseURL}/chats/all`
export const allChatsUnreadURL = (names = false) => `${baseURL}/chats/unread/${names ? '?names=true' : ''}`
export const lastMessageWithUserURL = (username = "") => `${baseURL}/chats/all/messages/${username}/page/0/1`
export const userProfileURL = (username = "") => `${baseURL}/api/users/${username}`
export const avatarUrl = (username = "") => `${baseURL}/avatar/${username}`