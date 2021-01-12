window.onload = setup

function setup() {
    const btAdd = document.getElementById('btAdd')
    /**
     * Add handler to button Add
     */
    btAdd
        .addEventListener("click", handlerAddArtist)
    /**
     * Add handler for each button Delete
     */
    document
        .querySelectorAll('.itemArtist')
        .forEach(li => {
            const btDelete = li.querySelector('button')
            btDelete.addEventListener("click", ev => handlerRemoveArtist(ev, li))
        })
}
function handlerAddArtist() {

}
/**
 * @param {Event} ev 
 * @param {Element} li 
 */
function handlerRemoveArtist(ev, li) {
    li.remove()
}