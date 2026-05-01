// ===== THEME SWITCHER =====
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeMenu = document.getElementById('themeMenu');
    const themeStyle = document.getElementById('theme-style');
    const themeOptions = document.querySelectorAll('.theme-option');

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('selectedTheme') || 'style';
    setTheme(savedTheme);

    // Toggle menu
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('active');
        themeToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
            themeMenu.classList.remove('active');
            themeToggle.classList.remove('active');
        }
    });

    // Selecionar tema
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            setTheme(theme);
            themeMenu.classList.remove('active');
            themeToggle.classList.remove('active');
        });
    });

    function setTheme(theme) {
        // Atualizar href do CSS
        themeStyle.href = `${theme}.css`;

        // Atualizar classe active nos botões
        themeOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.theme === theme) {
                opt.classList.add('active');
            }
        });

        // Salvar preferência
        localStorage.setItem('selectedTheme', theme);

        // Animação de transição
        document.body.style.opacity = '0.95';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }

    // Atalho de teclado: Ctrl + T
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            const themes = ['style', 'style1', 'style2', 'style3'];
            const current = themes.indexOf(localStorage.getItem('selectedTheme') || 'style');
            const next = themes[(current + 1) % themes.length];
            setTheme(next);
        }
    });
});