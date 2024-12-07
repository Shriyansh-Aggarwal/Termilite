const commands = {
    help: function() {
        this.echo(`List of available commands:\n\n${help}\n`);
    },
    echo: function(...args){
        this.echo(args.join(' '));
    },
    reset: function(){
        this.clear();
        this.pause();
        setTimeout(function(){
            ready();
        }, 200);
        this.resume();
    },
    clear: function(){
        this.clear();
    },
    whoami: function(){
        return [
            '',
            `OS: ${navigator.platform}`,
            `Language: ${navigator.language}`,
            `Version: ${navigator.appVersion}`,
            `Name: ${navigator.appName}`,
            `Product: ${navigator.product}`,
            ''
        ].join('\n');
    },
    credits: function() {
        return [
            '',
            '<white>Libraries Used:</white>',
            '* [ <a href="https://terminal.jcubic.pl" style="text-decoration:none">jQuery Terminal</a> ]',
            '* [ <a href="https://github.com/patorjk/figlet.js/" style="text-decoration:none">Figlet.js</a> ]',
            '* [ <a href="https://github.com/jcubic/isomorphic-lolcat" style="text-decoration:none">Isomorphic Lolcat</a> ]',
            ''
        ].join('\n');
    },
    exit: function() {
        if (confirm("Close Termilite?")) {
            close();
        }
    }
};

const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});
const help = formatted_list.join('\n');

const fonts = ['Slant', 'Star Wars', 'ANSI Shadow', 'Standard', 'Rounded', 'Roman', 'Red Phoenix',
    'Puffy', 'Modular', 'Merlin1', 'Larry 3D 2', 'Georgia11', 'Fraktur', 'DOS Rebel', 'Def Leppard', 'Cosmike']
const fselector = Math.floor(Math.random() * fonts.length);
const font = fonts[fselector];

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);

const re = new RegExp(`^\s*(${command_list.join('|')}) (.*)`);

$.terminal.new_formatter(function(string) {
    return string.replace(re, function(_, command, args) {
        return `<white>${command}</white> <aqua>${args}</aqua>`;
    });
})

const term = $('body').terminal(commands, {
    greetings: false,
    autocompleteMenu: true,
    completion: command_list,
    checkArity: false,
    clear: false,
    exit: false
});

term.on('click', '.command', function() {
    const command = $(this).text();
    term.exec(command);
});

term.pause();

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}

function ready() {
    const seed = Math.floor(Math.random() * 257);
    term.echo(() => {
        const ascii = rainbow(render('Termilite'), seed);
        return [
            `${ascii}`,
            '',
            'Welcome to the free and open source web terminal - <white>Termilite</white>',
            '<white>Termilite</white> is lightweight and <green>secure</green>, focusing on responsiveness and speed.',
            'Use <yellow>help</yellow> to check the available list of commands.',
            '',
            '<red>May not work as intended on mobile devices as of yet.</red>',
            '',
            commands.credits(),
            ''
        ].join('\n');
      }, {ansi: true}).resume();
}

function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}