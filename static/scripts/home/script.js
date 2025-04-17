document.addEventListener('DOMContentLoaded', function () {
    // Testimonials -----------------------------------------------------------------------
    const cards = document.querySelectorAll(".testimonial-card");
    const indicators = document.querySelectorAll(".indicator");
    const nextBtn = document.querySelector(".testimonial-next");
    const prevBtn = document.querySelector(".testimonial-prev");
    let current = 0;
    let interval;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.remove("active");
        });
        indicators.forEach((dot, i) => {
            dot.classList.remove("active");
        });
        cards[index].classList.add("active");
        indicators[index].classList.add("active");
    }

    function nextCard() {
        current = (current + 1) % cards.length;
        showCard(current);
    }

    function prevCard() {
        current = (current - 1 + cards.length) % cards.length;
        showCard(current);
    }

    function startAutoSlide() {
        interval = setInterval(nextCard, 10000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    nextBtn.addEventListener("click", () => {
        nextCard();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevCard();
        stopAutoSlide();
        startAutoSlide();
    });

    startAutoSlide();
    // End Testimonials -------------------------------------------------------------------

    // FAQ --------------------------------------------------------------------------------
    document.querySelectorAll('.faq-item').forEach(item => {
        const toggleElements = item.querySelectorAll('.faq-question, button');

        toggleElements.forEach(el => {
            el.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    });
    // End FAQ ----------------------------------------------------------------------------
});