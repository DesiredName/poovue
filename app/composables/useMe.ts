import { MeDataURL } from '~/utils/network';

export default async function useMe() {
    const { data } = await useFetch<Me>(MeDataURL(), {
        key: 'my-profile-data',
        getCachedData(key, nuxtApp) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
    });

    const me = ref<Me | null>(data.value ?? null);
    const isLoggedIn = computed(() => me.value != null);

    const toggleUnsafeContentAllowed = () => {
        if (me.value) {
            me.value.isUnsafeContentAllowed = !me.value.isUnsafeContentAllowed;
        }
    };

    return {
        isLoggedIn,
        isUnsafeContentAllowed: me.value?.isUnsafeContentAllowed === true,

        avatarURL: '',
        backgrgroundURL: '',

        username: me.value?.username ?? 'N/A',
        nickname: me.value?.nickname ?? 'N/A',
        shortname: (v => v.split(/\s/).map(word => word.charAt(0)).join(''))(me.value?.username ?? 'N/A'),

        toggleUnsafeContentAllowed,
    };
}
