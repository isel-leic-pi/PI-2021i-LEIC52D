window.onload = setup

function setup() {
    document
        .querySelectorAll('.artistItem')
        .forEach(item => {
            const artistName = item.querySelector('.artistName').textContent
            item
                .querySelector('button')
                .addEventListener('click', () => handlerRemoveArtist(item, artistName))
        })
}

/**
 * @param {Element} item 
 */
function  handlerRemoveArtist(item, artistName) {
    const loc = document.location.href
    const path =  loc.replace('/vinyl', '/api/vinyl') + '/artists/' + artistName
    fetch(path, { method: 'DELETE' })
        .then(resp => {
            if(resp.status != 200) alertMsg(resp.statusText)
            else {
                alertMsg(artistName + ' successfully removed.', 'success')
                item.remove()
            }
        })
        .catch(err => alertMsg(err))
}

/**
 * @param {String} message 
 * @param {(success|danger)} kind 
 */
function alertMsg(message, kind){
    if(!kind) kind = 'danger'
    document
        .querySelector('.messages')
        .innerHTML = 
            `<div class="alert alert-${kind} alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                ${message}
            </div>`
}