import { closest, find, children } from '../utils/vnode';
export default {
    methods: {
        $vqClosest(tag) {
            return closest(this, tag, 'ptTag');
        },
        $vqFind(tag) {
            return find(this, tag, 'ptTag');
        },
        $vqChildren(tag) {
            return children(this, tag, 'ptTag');
        }
    }
}
