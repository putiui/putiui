import PtBox from './box.vue';
import { version } from '../../../package.json';

PtBox.install = function (vue, ops = {}) {
    vue.component(PtBox.name, PtBox);
}
PtBox.version = version;
export default PtBox;
