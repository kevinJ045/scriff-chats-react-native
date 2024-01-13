

export interface Message {
	content: string;
	time: number;
	recipient: string;
	id: string;
	username: string;
	special: string | null;
	modified: boolean;
	read: boolean;
}