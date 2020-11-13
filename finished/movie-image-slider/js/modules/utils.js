const UtilsModule = (() => {
    const styles = styleList => {
        return Object.entries(styleList)
            .map(([prop, value]) => `${prop}: ${value};`)
            .join(' ');
    };

    return { styles };
})();

export default UtilsModule;
