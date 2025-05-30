declare type CookiePolicyOptions = {
    allowTechCookies: true;
    allowOne: boolean;
    allowTwo: boolean;
    allowThree: boolean;
};

const defaultPolicyOptions = () => ({
    allowTechCookies: true,
    allowOne: false,
    allowTwo: false,
    allowThree: false,
}) satisfies CookiePolicyOptions;

const acceptAllPolicyOptions = () => ({
    allowTechCookies: true,
    allowOne: true,
    allowTwo: true,
    allowThree: true,
}) satisfies CookiePolicyOptions;

export default function useCookiePolicy() {
    const cookie = useCookie('cookie-policy-accepted', { default: () => ref<string | null>(null) });
    const userActionReceived = ref<boolean>(false);
    const options = computed(() => {
        if (cookie.value == null) {
            return defaultPolicyOptions();
        } else {
            try {
                const stored = JSON.parse(cookie.value);

                return stored as unknown as CookiePolicyOptions;
            } catch (ex) {
                console.error(ex);
                return defaultPolicyOptions();
            }
        }
    });

    watchEffect(() => {
        userActionReceived.value = cookie.value != null;
    });

    const acceptPolicy = (_: Event, options?: CookiePolicyOptions) => {
        try {
            cookie.value = JSON.stringify(options ?? acceptAllPolicyOptions());
            userActionReceived.value = true;
        } catch (ex) {
            console.error(ex);
        }
    };

    const declinePolicy = (_: Event) => {
        try {
            cookie.value = JSON.stringify(defaultPolicyOptions());
            userActionReceived.value = true;
        } catch (ex) {
            console.error(ex);
        }
    };

    return {
        userActionReceived: computed(() => userActionReceived.value === true),

        options: readonly(options),

        acceptPolicy,
        declinePolicy,
    };
}
