var config={
    development:{
        unsecure:{
            protocol:'http://',
            host:process.env.hostaddy,
            port:':3000'
        }
    },
    testing:{
        unsecure:{
            protocol:'http://',
            host:'philance.hopto.org',
            port:''
        },
        secure:{
            protocol:'https://',
            host:'philance.hopto.org',
            port:''
        },
    },
    production:{
        unsecure:{
            protocol:'http://',
            host:'philance.ddns.net',
            port:''
        },
        secure:{
            protocol:'https://',
            host:'philance.ddns.net',
            port:''
        },
    },
}
module.exports=config;