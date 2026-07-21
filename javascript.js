const ui =
{
    mainContent: document.querySelector('.main-content'),
    randomShortcutBtn: document.querySelector('#random-shortcut'),
    feedback: document.querySelector('#feedback'),
    shortcut: document.querySelector('#shortcut'),
    p: document.querySelector('#shortcut-instruction'),
    shortcutSelect: document.querySelector('#shortcut-select'),
    editor: document.querySelector('.editor'),
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

    renderSelectShortcut() {
        let prevShortcut = { category: '' };
        for (const shortcut of game.shortcutList) {
            const optgroup = document.createElement('optgroup');
            const option = document.createElement('option');
            option.textContent = shortcut.action + " | " + shortcut.category;
            if (shortcut.category !== prevShortcut.category) {
                optgroup.setAttribute('label', shortcut.category);

                this.shortcutSelect.appendChild(optgroup);
            }
            this.shortcutSelect.appendChild(option);
            prevShortcut = shortcut
        }
    },

    clearEditor() {
        while (this.editor.lastChild) {
            this.editor.removeChild(this.editor.lastChild);
        }
    },

    renderEditor() {
        this.clearEditor();
        for (let line = 0; line < game.currentShortcut.examples.before.length; line++) {
            const div = document.createElement('div');
            div.textContent = game.currentShortcut.examples.before[line];
            this.editor.appendChild(div);
        }
    },

    init() {
        this.displayShortcut();
        this.eventListeners();
        this.renderSelectShortcut();
        this.renderEditor()
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
            },
            examples: {
                before: [
                    "No visual example for this shortcut yet."
                ],
                after: [
                    "No visual example for this shortcut yet."
                ],
                explanation: [],
            },
        },
        {
            id: 2,
            action: "Paste copied line",
            display: "Ctrl+V",
            category: "Editing",
            keys: {
                ctrl: true,
                key: "v",
            },
            examples: {
                before: [
                    "No visual example for this shortcut yet."
                ],
                after: [
                    "No visual example for this shortcut yet."
                ],
                explanation: [],
            },
        },
        {
            id: 3,
            action: "Select variable",
            display: "Ctrl+D",
            category: "Editing",
            keys: {
                ctrl: true,
                key: "d"
            },
            examples: {
                before: [
                    "const oldName = 'John;'",
                    "console.log(oldName)",
                ],
                after: {
                    line1: "const newName = 'John;'",
                    line2: "console.log(newName)",
                },
                explanation: {},
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
            },
            examples: {
                before: [
                    "No visual example for this shortcut yet."
                ],
                after: [
                    "No visual example for this shortcut yet."
                ],
                explanation: [],
            },
        },
        {
            id: 5,
            action: "Go to file...",
            display: "Ctrl+P",
            category: "Navigating",
            keys: {
                ctrl: true,
                key: "p",
            },
            examples: {
                before: [
                    "No visual example for this shortcut yet."
                ],
                after: [
                    "No visual example for this shortcut yet."
                ],
                explanation: [],
            },
        },
        {
            id: 6,
            action: "Go to line...",
            display: "Ctrl+G",
            category: "Navigating",
            keys: {
                ctrl: true,
                key: "g",
            },
            examples: {
                before: [
                    "No visual example for this shortcut yet."
                ],
                after: [
                    "No visual example for this shortcut yet."
                ],
                explanation: [],
            },
        },
    ],
    currentShortcut: '',
    userCombination: {},
    isMatch: false,
    generateShortcut() {
        let prevShortcut = this.currentShortcut;
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
            ui.renderEditor();
            return "Nicely done!"
        } else return game.userCombination.key + " was pressed";
    }
}

function play() {
    game.generateShortcut();
    ui.init();
}

play();