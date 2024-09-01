document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.pagination-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            window.location.href = `/products/paginate?page=${page}&limit=10`;
        });
    });
});
