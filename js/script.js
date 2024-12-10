function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Logo changing
    const logo = document.getElementById("logo");
    if (document.body.classList.contains('dark-mode')) {
        logo.src = "img/general/logowhite.png"; // white logo for dark mode
    } else {
        logo.src = "img/general/logoblack.png"; // black logo for light mode
    }
}

// Language translations
const translations = {
    tr: {
        home: "Anasayfa",
        notes: "Notlar",
        pomodoro: "Pomodoro",
        todos: "Yapılacaklar Listesi",
        title: "Yapılacaklar Listesi",
        content: "Bir seferde bir işi halledin.",
        emptyMessage: "Yapılacaklar listeniz boş.",
        addItemLabel: "Yapılacaklar listesine ekle",
        newItemPlaceholder: "Ne yapmanız gerekiyor?",
        addButton: "Ekle"
    },
    en: {
        home: "Home",
        notes: "Notes",
        pomodoro: "Pomodoro",
        todos: "To-Do List",
        title: "To-Do List",
        content: "Get things done, one item at a time.",
        emptyMessage: "Your to-do list is empty.",
        addItemLabel: "Add to the to-do list",
        newItemPlaceholder: "What do you need to do?",
        addButton: "Add Item"
    },
    de: {
        home: "Startseite",
        notes: "Notizen",
        pomodoro: "Pomodoro",
        todos: "To-Do-Liste",
        title: "To-Do-Liste",
        content: "Erledige die Dinge, einen Gegenstand nach dem anderen.",
        emptyMessage: "Deine To-Do-Liste ist leer.",
        addItemLabel: "Zur To-Do-Liste hinzufügen",
        newItemPlaceholder: "Was musst du tun?",
        addButton: "Hinzufügen"
    }
};


// Language switcher function
function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Default language on page load
setLanguage('en');