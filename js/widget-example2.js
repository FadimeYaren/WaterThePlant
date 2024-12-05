//benzersiz kimlikli widgetler ---> test-widget4.html

import Widget from './widget.js';

let widgetCounter = 0; // Benzersiz ID oluşturmak için sayaç

class SimpleWidget {
    constructor() {
        this.id = `widget-${++widgetCounter}`; // Benzersiz kimlik
        this.widget = new Widget(
            this.id,
            2, // Minimum genişlik
            1, // Minimum yükseklik
            `<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 16px;">
                Widget ${widgetCounter}
            </div>`
        );
    }

    appendTo(container) {
        this.widget.appendTo(container);
    }
}

export default SimpleWidget;
