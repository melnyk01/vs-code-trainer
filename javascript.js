const ui =
{
    mainContent: document.querySelector('.main-content'),
    randomShortcutBtn: document.querySelector('#random-shortcut'),
    feedback: document.querySelector('#feedback'),
    shortcut: document.querySelector('#shortcut'),
    p: document.querySelector('#shortcut-instruction'),
    shortcutSelect: document.querySelector('#shortcut-select'),
    displayShortcut() {
        this.shortcut.textContent = `Let's learn shortcut "${game.currentShortcut.action}"`;
        this.p.textContent = `Press ${game.currentShortcut.display}`;

    },

    eventListeners() {
        document.addEventListener('keydown', (event) => {
            game.userCombination.ctrl = event.ctrlKey;
            game.userCombination.key = event.key;
            game.isMatch = game.checkShortcut();
            if (game.isMatch) {
                event.preventDefault()
                this.feedback.style.color = "green";
            } else this.feedback.style.color = "black"
            this.feedback.textContent = game.feedback()
        }
        );
        this.randomShortcutBtn.addEventListener('click', () => {
            game.generateShortcut();
            this.displayShortcut();
        })
    },

    renderShortcutSelect() {
        for (shortcut of game.shortcutList) {
            const option = document.createElement('option');
            option.textContent = shortcut.action + " | " + shortcut.category;
            this.shortcutSelect.appendChild(option);
        }
    },

    init() {
        this.displayShortcut();
        this.eventListeners();
        this.renderShortcutSelect();
    }
}

const game = {
    shortcutList: [
        {
            id: 1,
            action: "Copy current line",
            display: "Ctrl+C",
            category: "Editing",
            keys: {
                ctrl: true,
                key: "c",
            }
        },
        {
            id: 2,
            action: "Paste copied line",
            display: "Ctrl+V",
            category: "Editing",
            keys: {
                ctrl: true,
                key: "v",
            }
        },
        {
            id: 3,
            action: "Select variable",
            display: "Ctrl+D",
            category: "Editing",
            keys: {
                ctrl: true,
                key: "d"
            }
        },
        {
            id: 4,
            action: "Save file",
            display: "Ctrl+S",
            category: "Saving",
            keys: {
                ctrl: true,
                key: "s",
            }
        },
        {
            id: 5,
            action: "Go to file...",
            display: "Ctrl+P",
            category: "Navigating",
            keys: {
                ctrl: true,
                key: "p",
            }
        },
        {
            id: 6,
            action: "Go to line...",
            display: "Ctrl+G",
            category: "Navigating",
            keys: {
                ctrl: true,
                key: "g",
            }
        },
    ],
    currentShortcut: '',
    userCombination: {},
    isMatch: false,
    generateShortcut() {
        prevShortcut = this.currentShortcut;
        while (this.currentShortcut === prevShortcut) {
            this.currentShortcut = this.shortcutList[(Math.floor(Math.random() * this.shortcutList.length))]
        }
    },

    checkShortcut() {
        return (
            this.currentShortcut.keys.ctrl === this.userCombination.ctrl &&
            this.currentShortcut.keys.key === this.userCombination.key)
    },
    feedback() {
        if (game.isMatch) {
            game.generateShortcut();
            ui.displayShortcut();
            return "Nicely done!"
        } else return game.userCombination.key + " was pressed";
    }
}

function play() {
    game.generateShortcut();
    ui.init();
}

play();