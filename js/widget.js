// widget.js
class Widget {
    constructor(id, minWidth, minHeight, content) {
        this.id = id;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
        this.content = content;

        this.widgetElement = this.createWidgetElement();
    }

    // Widget oluşturma
    createWidgetElement() {
        const widget = document.createElement('div');
        widget.id = this.id;
        widget.classList.add('widget');
        widget.style.minWidth = `${this.minWidth * 100}px`;
        widget.style.minHeight = `${this.minHeight * 100}px`;
        widget.style.width = `${this.minWidth * 100}px`;
        widget.style.height = `${this.minHeight * 100}px`;
        widget.innerHTML = this.content;
    
        // Varsayılan pozisyon
        widget.style.position = 'absolute';
        widget.style.left = '0px';
        widget.style.top = '0px';
    
        // Drag & Drop özellikleri
        this.initDraggable(widget);
        return widget;
    }
    

    // Drag & Drop özelliklerini ekle
initDraggable(widget) {
    widget.draggable = true;

    widget.addEventListener('dragstart', (e) => {
        widget.classList.add('dragging');
        e.dataTransfer.setData('text/plain', this.id);
    });

    widget.addEventListener('dragend', () => {
        widget.classList.remove('dragging');
    });
}


    appendTo(container) {
        container.appendChild(this.widgetElement);
    }
}

export default Widget;
