import { version } from '../package.json';
import PtBox from './components/box/index.js';
import PtText from './components/text/index.js';
import PtGrid from './components/grid/index.js';
import PtButton from './components/button/index.js';
import PtButtonGroup from './components/button-group/index.js';
import PtButtonLabel from './components/button-label/index.js';
import PtDivider from './components/divider/index.js';
import PtRadio from './components/radio/index.js';
import PtRadioGroup from './components/radio-group/index.js';
import PtCheckbox from './components/checkbox/index.js';
import PtCheckboxGroup from './components/checkbox-group/index.js';
import Menu from './components/menu/index.js';
import MenuItem from './components/menu-item/index.js';
import SubMenu from './components/sub-menu/index.js';
import MenuItemGroup from './components/menu-item-group/index.js';

export {
    PtBox,
    PtText,
    PtGrid,
    PtButton,
    PtButtonGroup,
    PtButtonLabel,
    PtDivider,
    PtRadio,
    PtRadioGroup,
    PtCheckbox,
    PtCheckboxGroup,
    Menu,
    MenuItem,
    SubMenu,
    MenuItemGroup
}

export default {
    version,
    PtBox,
    PtText,
    PtGrid,
    PtButton,
    PtButtonGroup,
    PtButtonLabel,
    PtDivider,
    PtRadio,
    PtRadioGroup,
    PtCheckbox,
    PtCheckboxGroup,
    Menu,
    MenuItem,
    SubMenu,
    MenuItemGroup,
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
        PtRadio.install(Vue, options.PtRadio);
        PtRadioGroup.install(Vue, options.PtRadioGroup);
        PtCheckbox.install(Vue, options.PtCheckbox);
        PtCheckboxGroup.install(Vue, options.PtCheckboxGroup);
        Menu.install(Vue, options.Menu);
        MenuItem.install(Vue, options.MenuItem);
        SubMenu.install(Vue, options.SubMenu);
        MenuItemGroup.install(Vue, options.MenuItemGroup);
    }
}
