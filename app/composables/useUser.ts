export default function useUser() {
    const isLoggedIn = ref(false);

    const username = ref<string>('Test user');

    return {
        isLoggedIn,

        username,
    };
}
