const UtilsModule = (() => {
    const styles = styleList => {
        return Object.entries(styleList)
            .map(([prop, value]) => `${prop}: ${value};`)
            .join(' ');
    };

    const $ = (selector) => {
        return document.querySelector(selector);
    }

    return { styles, $ };
})();

export default UtilsModule;
