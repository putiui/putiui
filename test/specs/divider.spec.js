import Vue from 'vue';
import Divider from '../../src/components/divider/index.js';
import { createVM } from '../util/vue.js';

Vue.use(Divider);
describe(Divider.name, () => {
    it('pass', () => {
        let vm = createVM({
            template: `
            <pt-divider>or</pt-divider>
            `
        });
        assert.isTrue(vm.El.hasClass('pt-divider'));
        vm.dst();
    })
});