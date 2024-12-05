//basit widget oluşturma.  ------> test-widget3.html

import Widget from './widget.js';

class SimpleWidget {
    constructor() {
        this.widget = new Widget(
            'simple-widget', // Widget ID
            2, // Minimum genişlik (2 hücre)
            1, // Minimum yükseklik (1 hücre)
            `<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 16px;">
                Widget
            </div>` // İçerik
        );
    }

    appendTo(container) {
        this.widget.appendTo(container);
    }
}

export default SimpleWidget;
