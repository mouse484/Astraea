const creaateUserStore = () => {
	let pubkey = $state<string>();
	return {
		setPubkey: (value: string) => {
			pubkey = value;
		},
		get pubkey() {
			return pubkey;
		}
	};
};

export const user = creaateUserStore();
