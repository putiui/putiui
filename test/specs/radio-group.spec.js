import Vue from 'vue';
import $ from 'jquery';
import Radio from '../../src/components/radio/index';
import RadioGroup from '../../src/components/radio-group/index';
import { createVM } from '../util/vue';
Vue.use(Radio);
Vue.use(RadioGroup);

describe(RadioGroup.name, () => {
    it('props', done => {
        const vm = createVM({
            template: `
            <pt-radio-group ref="group" v-model="value" :name="name" :disabled="disabled">
                <pt-radio value='bj'>北京</pt-radio>
                <pt-radio value='sh'>上海</pt-radio>
            </pt-radio-group>
            `,
            data() {
                return {
                    value: 'bj',
                    name: '',
                    disabled: false
                }
            },
            mounted() {
                var core = this.core;
                assert.isTrue(!$(this.$refs.group.$el).hasClass('disabled'));
                assert.isTrue(this.$refs.group.name === this.name);
                assert.isTrue(this.$refs.group.value === this.value);
                assert.isTrue(this.$refs.group.disabled === this.disabled);
                done();
            }
        });
    });

    it('v-model', done => {
        const vm = createVM({
            template: `
            <pt-radio-group v-model="value">
                <pt-radio value='bj'>北京</pt-radio>
                <pt-radio value='sh'>上海</pt-radio>
            </pt-radio-group>
            `,
            data() {
                return {
                    value: 'bj'
                }
            },
            mounted() {
                assert.isTrue(this.value === 'bj');
                assert.isTrue(this.El.find(":radio[value='bj']").prop('checked'));
                assert.isFalse(this.El.find(":radio[value='sh']").prop('checked'));

                this.El.find(":radio[value='sh']").click();
                this.$nextTick().then(() => {
                    assert.isTrue(this.value === 'sh');
                    assert.isTrue(this.El.find(":radio[value='sh']").prop('checked'));
                    assert.isFalse(this.El.find(":radio[value='bj']").prop('checked'));
                    this.value = '';
                }).then(() => {
                    assert.isTrue(this.value === '');
                    assert.isFalse(this.El.find(":radio[value='sh']").prop('checked'));
                    assert.isFalse(this.El.find(":radio[value='bj']").prop('checked'));
                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                })
            }
        });
    })

    it('disabled', done => {
        const vm = createVM({
            template: `
            <pt-radio-group v-model="value" :disabled="disabled">
                <pt-radio value='bj'>北京</pt-radio>
                <pt-radio value='sh'>上海</pt-radio>
            </pt-radio-group>
            `,
            data() {
                return {
                    value: '',
                    disabled: true
                }
            },
            mounted() {
                var core = this.getCoreVM();
                var coreEl = $(core.$el);
                assert.isTrue(coreEl.hasClass('disabled'))
                assert.isTrue(this.value === '');
                assert.isTrue(this.El.find(":radio:checked").length == 0);

                this.El.find(":radio[value='sh']").click();
                this.$nextTick().then(() => {
                    assert.isTrue(this.value === '');
                    assert.isTrue(this.El.find(":radio:checked").length == 0);
                    this.value = 'bj';
                }).then(() => {
                    assert.isTrue(this.value === 'bj');
                    assert.isTrue(this.El.find(":radio[value='bj']").prop('checked'));
                    this.disabled = false;
                }).then(() => {
                    assert.isTrue(!coreEl.hasClass('disabled'));
                    this.El.find(":radio[value='sh']").click();
                }).then(() => {
                    assert.isTrue(this.value === 'sh');
                    assert.isTrue(this.El.find(":radio[value='sh']").prop('checked'));
                    assert.isFalse(this.El.find(":radio[value='bj']").prop('checked'));
                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                })
            }
        })
    })

    it('onChange', done => {
        const vm = createVM({
            template: `
            <pt-radio-group v-model="value" @change="data=true">
                <pt-radio value='bj'>北京</pt-radio>
                <pt-radio value='sh'>上海</pt-radio>
            </pt-radio-group>
            `,
            data() {
                return {
                    value: '',
                    data: false
                }
            },
            mounted() {
                var self = this;
                assert.isFalse(this.data);
                this.El.find(":radio[value='sh']").click();
                this.$nextTick().then(() => {
                    assert.isTrue(this.data);
                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                });
            }
        })
    })

    it('onChange only user input', done => {
        const vm = createVM({
            template: `
            <pt-radio-group v-model="value" @change="data=2">
                <pt-radio value='bj'>北京</pt-radio>
                <pt-radio value='sh'>上海</pt-radio>
            </pt-radio-group>
            `,
            data() {
                return {
                    value: '',
                    data: 1,
                    name: 'unit'
                }
            },
            mounted() {
                var self = this;
                assert.isTrue(this.data === 1);
                assert.isTrue(this.value === '');
                assert.isTrue(this.El.find(":radio:checked").length == 0);
                this.El.find(":radio[value='sh']").click();

                this.$nextTick().then(() => {
                    assert.isTrue(this.value === 'sh');
                    assert.isTrue(this.data === 2);
                    this.data = 1;
                    this.value = 'bj';
                }).then(() => {
                    assert.isTrue(this.value === 'bj');
                    assert.isTrue(this.data === 1);

                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                });
            }
        })
    })

    describe('setting options', () => {
        it('options render radios', done => {
            createVM({
                template: `
                <pt-radio-group :options="ops"></pt-radio-group>
                `,
                data() {
                    return {
                        ops: ['男', '女']
                    }
                },
                mounted() {
                    assert.equal(this.El.find(':radio').length, 2);
                    this.dst();
                    done()
                }
            })
        })

        it('options render radios + slot', done => {
            createVM({
                template: `
                <pt-radio-group :options="ops">
                    <pt-radio value='未知'></pt-radio>
                </pt-radio-group>
                `,
                data() {
                    return {
                        ops: ['男', '女']
                    }
                },
                mounted() {
                    assert.equal(this.El.find(':radio').length, 3);
                    this.dst();
                    done()
                }
            })
        })

        it('v-model', done => {
            const vm = createVM({
                template: `
                <pt-radio-group v-model="value" :options="ops">
                    <pt-radio value='bj'>北京</pt-radio>
                    <pt-radio value='sh'>上海</pt-radio>
                </pt-radio-group>
                `,
                data() {
                    return {
                        value: 'bj',
                        ops: ['男', '女']
                    }
                },
                mounted() {
                    assert.equal(this.El.find(':radio').length, 4);
                    assert.isTrue(this.value === 'bj');
                    assert.isTrue(this.El.find(":radio[value='bj']").prop('checked'));
                    assert.isFalse(this.El.find(":radio[value='sh']").prop('checked'));

                    this.El.find(":radio[value='男']").click();
                    this.$nextTick().then(() => {
                        assert.isTrue(this.value === '男');
                        assert.isTrue(this.El.find(":radio[value='男']").prop('checked'));
                        assert.isFalse(this.El.find(":radio[value='bj']").prop('checked'));
                        this.value = '';
                    }).then(() => {
                        assert.isTrue(this.value === '');
                        assert.equal(this.El.find(':radio:checked').length, 0);
                        this.dst();
                        done();
                    }).catch(err => {
                        done(err);
                    })
                }
            });
        })

        it('disabled', done => {
            const vm = createVM({
                template: `
                <pt-radio-group v-model="value" :options="ops" :disabled="disabled">
                    <pt-radio value='bj'>北京</pt-radio>
                    <pt-radio value='sh'>上海</pt-radio>
                </pt-radio-group>
                `,
                data() {
                    return {
                        value: '',
                        disabled: true,
                        ops: ['男', '女']
                    }
                },
                mounted() {
                    var core = this.getCoreVM();
                    var coreEl = $(core.$el);
                    this.El.find(":radio[value='男']").click();
                    this.$nextTick().then(() => {
                        assert.isTrue(this.value === '');
                        assert.isTrue(this.El.find(":radio:checked").length == 0);
                        this.value = 'bj';
                    }).then(() => {
                        assert.isTrue(this.value === 'bj');
                        assert.isTrue(this.El.find(":radio[value='bj']").prop('checked'));
                        this.disabled = false;
                    }).then(() => {
                        assert.isTrue(!coreEl.hasClass('disabled'));
                        this.El.find(":radio[value='男']").click();
                    }).then(() => {
                        assert.isTrue(this.value === '男');
                        assert.isTrue(this.El.find(":radio[value='男']").prop('checked'));
                        assert.equal(this.El.find(":radio:not([value='男']):checked").length, 0);
                        this.dst();
                        done();
                    }).catch(err => {
                        done(err);
                    })
                }
            })
        })

        it('onChange', done => {
            const vm = createVM({
                template: `
                <pt-radio-group v-model="value" @change="data=true" :options="ops">
                    <pt-radio value='bj'>北京</pt-radio>
                    <pt-radio value='sh'>上海</pt-radio>
                </pt-radio-group>
                `,
                data() {
                    return {
                        value: '',
                        data: false,
                        ops: ['男', '女']
                    }
                },
                mounted() {
                    var self = this;
                    assert.isFalse(this.data);
                    this.El.find(":radio[value='男']").click();
                    this.$nextTick().then(() => {
                        assert.isTrue(this.data);
                        this.dst();
                        done();
                    }).catch(err => {
                        done(err);
                    });
                }
            })
        })

        const data = {
            array: ['男', 1, { name: 'Tom' }],
            stringArray: ['男', '女'],
            objectArray1: [{ name: 'Tom' }, { name: 'Alice' }],
            objectArray2: [{ label: 'Tom', value: 1 }, { label: 'Alice', value: 2 }],
            object: {
                '1': '北京',
                '2': '上海'
            }
        }

        describe('precut value', () => {
            it('$prop', done => {
                var unit = {
                    array() {
                        this.$vqFind('pt-radio').forEach((item, index) => {
                            assert.equal(JSON.stringify(data.array[index]), item.value)
                            assert.equal(`${index}`, $.trim($(item.$el).text()));
                        })
                    },
                    stringArray() {
                        this.$vqFind('pt-radio').forEach((item, index) => {
                            assert.equal(JSON.stringify(data.stringArray[index]), item.value)
                            assert.equal(`${index}`, $.trim($(item.$el).text()));
                        })
                    },
                    objectArray1() {
                        this.$vqFind('pt-radio').forEach((item, index) => {
                            assert.equal(JSON.stringify(data.objectArray1[index]), item.value)
                            assert.equal(`${index}`, $.trim($(item.$el).text()));
                        })
                    },
                    object() {
                        assert.equal(this.El.find(':radio[value="1"]').closest('label').text().trim(), '1')
                        assert.equal(this.El.find(':radio[value="2"]').closest('label').text().trim(), '2')
                    }
                }
                Promise.all(Object.keys(data).map(key => {
                    return new Promise((resolve, reject) => {
                        var item = data[key];
                        createVM({
                            template: `
                                <pt-radio-group v-model="value" :options="ops" :label-option="'$prop'"></pt-radio-group>
                            `,
                            data() {
                                return {
                                    value: '',
                                    ops: JSON.parse(JSON.stringify(item))
                                }
                            },
                            mounted() {
                                if (unit[key]) {
                                    try {
                                        unit[key].call(this);
                                        resolve(this);
                                    } catch (error) {
                                        reject(error);
                                    }
                                } else {
                                    resolve(this);
                                }
                            }
                        })
                    })
                })).then(vms => {
                    done();
                }).catch(err => {
                    done(err);
                })
            })

            it('$value', done => {
                var unit = {
                    array() {
                        this.$vqFind('pt-radio').forEach((item, index) => {
                            assert.equal(index, item.value)
                            assert.equal(typeof data.array[index] === 'object' ? JSON.stringify(data.array[index]) : data.array[index] + '', $.trim($(item.$el).text()));
                        })
                    },
                    stringArray() {
                        this.$vqFind('pt-radio').forEach((item, index) => {
                            assert.equal(JSON.stringify(data.stringArray[index]), item.value)
                            assert.equal(`${index}`, $.trim($(item.$el).text()));
                        })
                    },
                    objectArray1() {
                        this.$vqFind('pt-radio').forEach((item, index) => {
                            assert.equal(JSON.stringify(data.objectArray1[index]), item.value)
                            assert.equal(`${index}`, $.trim($(item.$el).text()));
                        })
                    },
                    object() {
                        assert.equal(this.El.find(':radio[value="1"]').closest('label').text().trim(), '1')
                        assert.equal(this.El.find(':radio[value="2"]').closest('label').text().trim(), '2')
                    }
                }
                Promise.all(Object.keys(data).map(key => {
                    return new Promise((resolve, reject) => {
                        var item = data[key];
                        createVM({
                            template: `
                                <pt-radio-group v-model="value" :options="ops" :label-option="'$value'"></pt-radio-group>
                            `,
                            data() {
                                return {
                                    value: '',
                                    ops: JSON.parse(JSON.stringify(item))
                                }
                            },
                            mounted() {
                                if (unit[key]) {
                                    try {
                                        unit[key].call(this);
                                        resolve(this);
                                    } catch (error) {
                                        reject(error);
                                    }
                                } else {
                                    resolve(this);
                                }
                            }
                        })
                    })
                })).then(vms => {
                    done();
                }).catch(err => {
                    done(err);
                })
            })
        })
    })
});