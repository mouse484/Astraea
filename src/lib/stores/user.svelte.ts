let pubkey = $state<string>();

export const userStore = () => {
	return {
		setPubkey: (value: string) => {
			pubkey = value;
		},
		get pubkey() {
			return pubkey;
		}
	};
};
