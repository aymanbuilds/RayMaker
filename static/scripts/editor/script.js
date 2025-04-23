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
        const summaryField = document.getElementById('sidebar-summary'); // NEW

        const nameDisplay = document.getElementById('name');
        const contactDisplay = document.getElementById('contact-info');
        const locationDisplay = document.getElementById('location-info');
        const summarySection = document.getElementById('professional-summary'); // NEW
        const summaryText = document.getElementById('summary-text'); // NEW

        function updateHeader() {
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const phone = phoneField.value.trim();
            const location = locationField.value.trim();
            const linkedIn = linkedInField.value.trim();
            const website = websiteField.value.trim();

            nameDisplay.textContent = name || "John Doe";

            const contactParts = [];
            if (email) contactParts.push(`Email: ${email}`);
            if (phone) contactParts.push(`Phone: ${phone}`);
            contactDisplay.textContent = contactParts.join(' | ') || "";

            const locationParts = [];
            if (location) locationParts.push(`Location: ${location}`);
            if (linkedIn) locationParts.push(`LinkedIn: ${linkedIn}`);
            if (website) locationParts.push(`Portfolio: ${website}`);
            locationDisplay.textContent = locationParts.join(' | ') || "";
        }

        function updateSummary() {
            const summary = summaryField.value.trim();
            if (summary) {
                summaryText.innerHTML = summary.replace(/\n/g, '<br>');
                summarySection.style.display = "block";
            } else {
                summaryText.textContent = "";
                summarySection.style.display = "none";
            }
        }

        // Bind inputs
        const inputs = [
            nameField, emailField, phoneField,
            locationField, linkedInField, websiteField,
            summaryField // NEW
        ];

        inputs.forEach(input => input.addEventListener('input', () => {
            updateHeader();
            updateSummary();
        }));

        // Initial update
        updateHeader();
        updateSummary();

        // Add Experience
        const addExperienceBtn = document.getElementById('add-experience-btn');

        addExperienceBtn.addEventListener('click', function () {
            const jobTitle = document.getElementById('sidebar-job').value.trim();
            const company = document.getElementById('sidebar-job-company').value.trim();
            const location = document.getElementById('sidebar-job-location').value.trim();
            const dates = document.getElementById('sidebar-job-date').value.trim();
            const description = document.getElementById('sidebar-job-description').value.trim();

            if (!jobTitle || !company || !location || !dates || !description) {
                alert("Please fill in all fields before adding a new work experience.");
                return;
            }

            const fullCompanyInfo = `${company} | ${location} | ${dates}`;

            const jobHTML = `
                <div class="work-entry">
                    <div class="row jcontent-sbetween aitems-center">
                        <div>
                            <h3 class="job-title">${jobTitle}</h3>
                            <p class="ats-template-bold job-company">${fullCompanyInfo}</p>
                            <div class="job-description">${description.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="row aitems-center">
                            <button class="blank icon">
                                <img width="24" height="24" data-close-popup="true" class="close"
                                    src="/static/icons/edit_icon.svg" alt="Edit work experience">
                            </button>
                            <button class="blank icon">
                                <img width="24" height="24" data-close-popup="true" class="close"
                                    src="/static/icons/delete_icon.svg" alt="Delete work experience">
                            </button>
                        </div>
                    </div>
                </div>
            `;

            const listContainer = document.getElementById('work-experience');
            listContainer.insertAdjacentHTML('beforeend', jobHTML);

            listContainer.style.display = 'block';

            document.getElementById('sidebar-job').value = '';
            document.getElementById('sidebar-job-company').value = '';
            document.getElementById('sidebar-job-location').value = '';
            document.getElementById('sidebar-job-date').value = '';
            document.getElementById('sidebar-job-description').value = '';
        });
    }
    // End Initialize Template Actions ****************************************************
});

// Helper Functions
function setVal(querySelector, value) {
    const element = document.querySelector(querySelector);
    if (element)
        element.value = value;
}