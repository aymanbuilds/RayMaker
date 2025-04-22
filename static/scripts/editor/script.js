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

    function expandSection(sectionIndex) {
        const sidebarSections = document.querySelectorAll('.sidebar-section');
        if (sidebarSections.length > sectionIndex) {
            const section = sidebarSections[sectionIndex];
            section.classList.add('expanded');

            // Toggle button text (+)
            const button = section.querySelector('.primary-fill');
            button.textContent = '-';
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

                        // Expand Basic Info Section
                        expandSection(0);

                        // Fill in Initial Boxes
                        setVal('#sidebar-fullname', 'John Doe');
                        document.getElementById('sidebar-fullname').focus();

                        setVal('#sidebar-fullname', 'John Doe');
                        setVal('#sidebar-email', 'john.doe@example.com');
                        setVal('#sidebar-phone', '(123) 456-7890');
                        setVal('#sidebar-location', 'New York, NY');
                        setVal('#sidebar-linkedIn', 'linkedin.com/in/johndoe');
                        setVal('#sidebar-website', 'www.johndoe.dev');

                        // Set Inputs Events
                        initializeTemplateActions();
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

    // Initialize Template Actions ********************************************************
    function initializeTemplateActions() {
        const nameField = document.getElementById('sidebar-fullname');
        const emailField = document.getElementById('sidebar-email');
        const phoneField = document.getElementById('sidebar-phone');
        const locationField = document.getElementById('sidebar-location');
        const linkedInField = document.getElementById('sidebar-linkedIn');
        const websiteField = document.getElementById('sidebar-website');

        const nameDisplay = document.getElementById('name');
        const contactDisplay = document.getElementById('contact-info');
        const locationDisplay = document.getElementById('location-info');

        function updateHeader() {
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const phone = phoneField.value.trim();
            const location = locationField.value.trim();
            const linkedIn = linkedInField.value.trim();
            const website = websiteField.value.trim();

            // NAME
            nameDisplay.textContent = name;

            // CONTACT INFO
            const contactParts = [];
            if (email) contactParts.push(`Email: ${email}`);
            if (phone) contactParts.push(`Phone: ${phone}`);
            contactDisplay.textContent = contactParts.join(' | ') || "";

            // LOCATION INFO
            const locationParts = [];
            if (location) locationParts.push(`Location: ${location}`);
            if (linkedIn) locationParts.push(`LinkedIn: ${linkedIn}`);
            if (website) locationParts.push(`Portfolio: ${website}`);
            locationDisplay.textContent = locationParts.join(' | ') || "";
        }

        // Bind inputs
        const inputs = [
            nameField, emailField, phoneField,
            locationField, linkedInField, websiteField
        ];
        inputs.forEach(input => input.addEventListener('input', updateHeader));

        // Initial update to sync preview with pre-filled input (if any)
        updateHeader();
    }
    // End Initialize Template Actions ****************************************************
});

// Helper Functions
function setVal(querySelector, value) {
    const element = document.querySelector(querySelector);
    if (element)
        element.value = value;
}