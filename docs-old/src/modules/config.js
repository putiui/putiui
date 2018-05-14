export default {
    name: '菩提UI',
    titleSeparator: ' - ',
    env: process.env.NODE_ENV,
    debug: false, // process.env.env === Enum.env.development,
    apiHost: {
        'default': {
            development: '',
            product: '',
            stage: ''
        }
    }
};
