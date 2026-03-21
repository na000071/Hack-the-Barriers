document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[href^="#"]');

    for (const link of links) {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
});
