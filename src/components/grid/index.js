import options from './options.js';
import PtRow from './row.vue';
import PtCol from './col.vue';
import { version } from '../../../package.json';
import { extend } from '../../utils/index.js';
const PtGrid = {};
PtGrid.install = function (vue, ops = {}) {
    PtGrid.options(ops);
    vue.component(PtRow.name, PtRow);
    vue.component(PtCol.name, PtCol);
}
PtGrid.version = PtRow.version = PtCol.version = version;
PtGrid.options = (ops) => {
    extend(true, options, ops);
};
PtGrid.PtRow = PtRow;
PtGrid.PtCol = PtCol;

export default PtGrid;
