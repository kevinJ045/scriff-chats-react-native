

export interface UserLike {
	username?: string;
	name?: string;
}

export class User implements UserLike {
	username: string = "";
	name: string = "";

	static from(user: UserLike){
		const u = new User();
		u.username = user.username!;
		u.name = user.name || "";
		return u;
	}
}