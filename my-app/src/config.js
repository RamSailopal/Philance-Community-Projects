export const hostname = () => {
    if (window.location.hostname.includes('philance.hopto.org')){
        return 'https://philance.zapto.org'
    }
	else if (window.location.hostname.includes('philance.ddns.net')){
        return 'https://philance.sytes.net'
    }
    else{
        return process.env.REACT_APP_ADDRSS
    }
}
