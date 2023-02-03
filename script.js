const imgListElement = document.querySelector(`.img-list`);
const imgElements = document.querySelectorAll(`.img-item`);


for (const img of imgElements) {
    img.draggable = true;
}

imgListElement.addEventListener(`dragstart`, (e) => {
    e.target.classList.add(`selected`);
});

imgListElement.addEventListener(`dragend`, (e) => {
    e.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
};

imgListElement.addEventListener(`dragover`, (e) => {
    e.preventDefault();

    const activeElement = imgListElement.querySelector(`.selected`);
    const currentElement = e.target;
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`img-item`);

    if (!isMoveable) {
        return;
    }

    const nextElement = getNextElement(e.clientY, currentElement);    

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) {
        return;
    }

    imgListElement.insertBefore(activeElement, nextElement);
});