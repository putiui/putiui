export * from './object';
export * from './is';
export * from './css';

export const uniqueID = () => {
    return (Math.random() + '').replace('0.', '');
}
