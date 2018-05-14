export var setDocumentTile = title => {
    document.title = title;
    var element = document.head.getElementsByTagName('title');
    if (element.length > 0) {
        element[0].innerHTML = title;
    }
}

export var safeHTML = (html) => {
    return window.document.createTextNode(html).nodeValue;
}
