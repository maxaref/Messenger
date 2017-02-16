export const push = function(url) {
    return {
        type:   'ROUTER',
        method: 'push',
        url:    url
    }
}

export const replace = function(url) {
    return {
        type:   'ROUTER',
        method: 'replace',
        url:    url
    }
}
