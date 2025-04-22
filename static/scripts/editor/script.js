document.addEventListener('DOMContentLoaded', function () {
    // Sidebar Actions --------------------------------------------------------------------
    const sectionHeaders = document.querySelectorAll('.section-header');

    function toggleSection(event) {
        event.stopPropagation();

        const section = event.target.closest('.sidebar-section');
        section.classList.toggle('expanded');

        // Toggle button text (+ -> -)
        const button = section.querySelector('.primary-fill');
        if (section.classList.contains('expanded')) {
            button.textContent = '-';
        } else {
            button.textContent = '+';
        }
    }

    sectionHeaders.forEach(header => {
        header.addEventListener('click', toggleSection);
    });

    if (document.querySelector('[data-close-sidebar="true"]')) {
        document.querySelector('[data-close-sidebar="true"]').addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar)
                sidebar.classList.remove('show');
        });
    }

    if (document.getElementById('open-sidebar-btn')) {
        document.getElementById('open-sidebar-btn').addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar)
                sidebar.classList.add('show');
        });
    }
    // End Sidebar Actions ----------------------------------------------------------------

    // Popup Actions **********************************************************************

    // Template Mode Popup ----------------------------------------------------------------
    const templateModecards = document.querySelectorAll('.template-mode-card');
    const confirmTemplateModeBtn = document.getElementById('select-resume-mode-btn');
    let selectedMode = null;

    templateModecards.forEach(card => {
        card.addEventListener('click', () => {
            templateModecards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedMode = card.getAttribute('data-mode');
        });
    });

    confirmTemplateModeBtn.addEventListener('click', () => {
        if (selectedMode) {
            fetch('/resume-builder/set-mode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrf_token]').value
                },
                body: JSON.stringify({ mode: selectedMode })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.html) {
                        document.querySelector('.resume-page').innerHTML = data.html;

                        // Close Popup
                        const popup = document.getElementById('template-mode-popup');
                        if (popup)
                            popup.classList.remove('show');
                    }
                })
                .catch(err => alert('Error: ' + err));
        } else {
            alert('Please select a mode first.');
        }
    });

    const templateModePopup = document.getElementById('template-mode-popup');
    setTimeout(() => {
        templateModePopup.classList.add('show');
    }, 200);

    if (document.querySelector('[data-close-popup="true"]')) {
        document.querySelectorAll('[data-close-popup="true"]').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                const popup = closeBtn.closest('.popup');
                if (popup)
                    popup.classList.remove('show');
            });
        });
    }
    // End Template Mode Popup ------------------------------------------------------------

    // End Popup Actions ******************************************************************
});