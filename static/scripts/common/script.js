document.addEventListener('DOMContentLoaded', function () {
    // Header Toggle Menu Buttons ---------------------------------------------------------
    if (document.getElementById('open-menu-btn')) {
        document.getElementById('open-menu-btn').addEventListener('click', function () {
            if (document.querySelector('header.main nav'))
                document.querySelector('header.main nav').classList.add('show');
        });
    }

    if (document.getElementById('close-menu-btn')) {
        document.getElementById('close-menu-btn').addEventListener('click', function () {
            if (document.querySelector('header.main nav'))
                document.querySelector('header.main nav').classList.remove('show');
        });
    }
    // End Header Toggle Menu Buttons -----------------------------------------------------
});