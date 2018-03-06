export * from './object';
export * from './is';

export const uniqueID = () => {
    return (Math.random() + '').replace('0.', '');
}
