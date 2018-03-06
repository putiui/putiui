import PtText from './text.vue';
import { version } from '../../../package.json';

PtText.install = function (vue, ops = {}) {
    vue.component(PtText.name, PtText);
}
PtText.version = version;
export default PtText;
