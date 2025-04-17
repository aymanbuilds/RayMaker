document.addEventListener('DOMContentLoaded', function () {
    // Select all section headers and buttons
    const sectionHeaders = document.querySelectorAll('.section-header');
    const buttons = document.querySelectorAll('.primary-fill');

    // Function to toggle the expanded state of the section
    function toggleSection(event) {
        event.stopPropagation();
        
        const section = event.target.closest('.sidebar-section');
        section.classList.toggle('expanded');

        // Toggle button text (+ -> -)
        const button = section.querySelector('.primary-fill');
        if (section.classList.contains('expanded')) {
            button.textContent = '-';  // Collapse button
        } else {
            button.textContent = '+';  // Expand button
        }
    }

    // Add click event listeners to section headers and buttons
    sectionHeaders.forEach(header => {
        header.addEventListener('click', toggleSection);
    });

    buttons.forEach(button => {
        button.addEventListener('click', toggleSection);
    });
});