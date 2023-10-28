export const formatAddress = (addr) => {
    return `${addr.substring(0, 8)}...`;
};

export const getErrorMessage = (errorDump) => {
    const delimiter = '"';
    const tokens = errorDump.split(delimiter).slice(0, 2);
    return tokens.join(delimiter) + '"';
};
