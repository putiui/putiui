import { closest, find, children } from '../utils/vnode';
export default {
    methods: {
        $vqClosest(tag) {
            return closest(this, tag);
        },
        $vqFind(tag) {
            return find(this, tag);
        },
        $vqChildren(tag) {
            return children(this, tag);
        }
    }
}
