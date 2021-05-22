import { Quill } from 'vue-quill-editor'

const Blockquote = Quill.import('formats/blockquote')

class CustomBlockquote extends Blockquote {
    static create(data) {
        const node = super.create(data)
        if (data.source) {
            node.setAttribute('data-source', data.source)
        }
        if (data.text) {
            node.innerText = data.text
        }
        return node
    }

    static formats(node) {
        return { 
            source: node.dataset.source 
        }
    }
}

Quill.register('formats/blockquote', CustomBlockquote)
