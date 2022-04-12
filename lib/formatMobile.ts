export const formatMobile = (value: string | number) => {
    const x = value
        .toString()
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/)!;

    return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
};
