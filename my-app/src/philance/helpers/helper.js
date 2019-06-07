export const storeLocal = (key, value) => {
    localStorage.setItem(key, value);
}
export const getLocal = (key) => {
    return localStorage.getItem(key);
}
export const getYoutubeVideoId = (url) => {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}
export const getEmbeddedUrl = (url) => {
    switch (new URL(url).host) {
        case 'vimeo.com':
        case 'www.vimeo.com': {
            return `https://player.vimeo.com/video${new URL(url).pathname}`
        }
        case 'youtube.com':
        case 'youtu.be':
        case 'www.youtube.com':
        case 'www.youtu.be': {
            return `https://youtube.com/embed/${getYoutubeVideoId(url)}`
        }
        default: {
            return 'https://youtube.com'
        }
    }
    //https://player.vimeo.com/video
    return `https://player.vimeo.com/video${new URL(url).pathname}`
}
