const appConfig = useAppConfig();
const isMobile = () => (window && (typeof window.matchMedia === 'function'))
    ? window.matchMedia(`(hover: none) or (pointer: coarse) or (width < ${appConfig.mobileDeviceWIthThreshold}px)`).matches === true
    : undefined;

export default isMobile;
