export default function useUser() {
    const isLoggedIn = ref(false);

    const username = ref<string>('Old Dude');
    const nickname = ref<string>('@old_dude');
    const isUnsafeContentAllowed = ref<boolean>(false);

    const toggleUnsafeContentAllowed = () => { isUnsafeContentAllowed.value = !isUnsafeContentAllowed.value; };

    return {
        isLoggedIn,
        isUnsafeContentAllowed,

        username,
        nickname,

        toggleUnsafeContentAllowed,
    };
}
