const isLoggedIn = ref(false);

const username = ref<string>('Old Dude');
const nickname = ref<string>('@old_dude');
const isUnsafeContentAllowed = ref<boolean>(false);

export default function useUser() {
    const toggleUnsafeContentAllowed = () => {
        isUnsafeContentAllowed.value = !isUnsafeContentAllowed.value;
    };

    return {
        isLoggedIn,
        isUnsafeContentAllowed,

        username,
        nickname,

        toggleUnsafeContentAllowed,
    };
}
