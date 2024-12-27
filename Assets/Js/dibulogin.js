   document.addEventListener('DOMContentLoaded', function () {
        var closeButton = document.querySelector('.jk-close-button');
        var targetElement = document.querySelector('.footSideBar.footNoSideBar');
        if (closeButton && targetElement) {
            closeButton.addEventListener('click', function () {
                targetElement.style.display = 'none';
            });
        }
    });