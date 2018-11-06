export const hostname = () => {
    if (window.location.hostname.includes('philance.hopto.org')){
        return 'https://philance.zapto.org'
    }
    else{
        return 'http://localhost:3001'
    }
}
