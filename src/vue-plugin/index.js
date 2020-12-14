export default (VsTree) => {
  return (Vue, options = {}) => {
    Vue.component('vs-tree', {
      template: '<div ref="tree" id="tree"></div>',
      props: {
        data: Array | Object,
        options: Object,
        animation: Boolean,
        draggable: Boolean,
        hideRoot: Boolean,
        showCheckbox: Boolean,
        showRadio: Boolean,
        radioParentoOnly: Boolean,
        showLine: Boolean,
        showIcon: Boolean,
        onlyShowLeafIcon: Boolean,
        highlightCurrent: Boolean,
        accordion: Boolean,
        nocheckParent: Boolean,
        sort: Boolean,
        checkOnClickNode: Boolean,
        checkFilterLeaf: Boolean,
        rootName: String,
        max: Number,
        lazy: Boolean,
        load: Function,
        format: Function,
        disabledKeys: Array,
        checkedKeys: Array,
        expandKeys: Array,
        expandLevel: {
          type: Number,
          default: 1
        },
        indent: {
          type: Number,
          default: 10
        },
        showCount: {
          type: Number,
          default: 20
        },
        itemHeight: {
          type: Number,
          default: 26
        },

        beforeCheck: Function,
        renderContent: Function,
        checkFilter: Function
      },
      data () {
        return {
          tree: {}
        }
      },
      watch: {
        max (newVal = 0) {
          this.setMaxValue(newVal)
        }
      },
      mounted () {
        this._vsinit()
      },
      methods: {
        _vsinit () {
          console.time('render:tree')
          this.tree.tree = new VsTree(this.$refs.tree, Object.assign({}, options, this.$props, {
            ...this.options,
            data: this.data,
            click: (event, node) => {
              this.$emit('click', event, node)
            },
            check: (event, node) => {
              this.$emit('check', event, node)
            },
            change: (node) => {
              this.$emit('change', node)
            },
            contextmenu: (event, node) => {
              this.$emit('node-contextmenu', event, node)
            },
            limitAlert: () => {
              this.$emit('limit-alert')
            }
          }))
          console.timeEnd('render:tree')
        },
        getNodeById (id) {
          return this.tree.tree.getNodeById(id)
        },
        getCheckedNodes () {
          return this.tree.tree.getCheckedNodes()
        },
        filter (value) {
          return this.tree.tree.filter(value)
        },
        setMaxValue (value = 0) {
          this.tree.tree.setMaxValue(value)
        }
      }
    })
  }
}
