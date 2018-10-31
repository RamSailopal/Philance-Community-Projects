export const hostname = () => {
    if (window.location.hostname.includes('philance.hopto.org')){
        return 'https://philance.hopto.org:434'
    }
    else{
        return 'http://localhost:3001'
    }
}