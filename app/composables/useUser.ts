export default function useUser() {
    const isLoggedIn = ref(false);

    return {
        isLoggedIn,
    };
}
