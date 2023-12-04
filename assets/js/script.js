const readMoreBtns = document.querySelectorAll('.link-custom');

readMoreBtns.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        const moreContent = this.previousElementSibling;
        moreContent.style.display = 'block';
        this.style.display = 'none';
    });
});