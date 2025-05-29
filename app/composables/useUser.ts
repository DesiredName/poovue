export default function useUser() {
    const isLoggedIn = ref(false);

    const username = ref<string>('Old Dude');
    const nickname = ref<string>('@old_dude');

    return {
        isLoggedIn,

        username,
        nickname,
    };
}
