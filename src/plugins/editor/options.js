import './blockquote'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link', 'image']
]

function imageHandler () {
  const tooltip = this.quill.theme.tooltip
  const originalSave = tooltip.save
  const originalHide = tooltip.hide

  tooltip.save = () => {
    const range = this.quill.getSelection(true)
    const value = tooltip.textbox.value
    
    if (value) {
      this.quill.insertEmbed(range.index, 'image', value, 'user')
    }
  };
  // Called on hide and save.
  tooltip.hide = () => {
    tooltip.save = originalSave
    tooltip.hide = originalHide
    tooltip.hide()
  };
  tooltip.edit('image')
  setTooltipPosition()
}

function setTooltipPosition () {
  const qlImageOffset = document.querySelector('.ql-image').offsetLeft
  const qlTooltip = document.querySelector('.ql-tooltip')

  qlTooltip.style.top = '0px'
  qlTooltip.style.left = `${qlImageOffset - 100}px`
}

export const quillOptions = {
  modules: {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        'image': imageHandler
      }
    }
  },
  placeholder: 'Напишите что-нибудь...'
}
