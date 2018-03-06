import { version } from '../package.json';
import PtBox from './components/box/index.js';
import PtText from './components/text/index.js';
import PtGrid from './components/grid/index.js';
import PtButton from './components/button/index.js';
import PtButtonGroup from './components/button-group/index.js';
import PtButtonLabel from './components/button-label/index.js';
import PtDivider from './components/divider/index.js';

export default {
    version,
    PtBox,
    PtText,
    PtGrid,
    PtButton,
    PtButtonGroup,
    PtButtonLabel,
    PtDivider,
    install(Vue, options = {}) {
        if (typeof options !== 'object') {
            options = {};
        }
        PtBox.install(Vue, options.PtBox);
        PtText.install(Vue, options.PtText);
        PtGrid.install(Vue, options.PtGrid);
        PtButton.install(Vue, options.PtButton);
        PtButtonGroup.install(Vue, options.PtButtonGroup);
        PtButtonLabel.install(Vue, options.PtButtonLabel);
        PtDivider.install(Vue, options.PtDivider);
    }
}
