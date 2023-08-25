const { expect, browser, $ , $$} = require('@wdio/globals')
const { assert } = require('chai');

describe('Bifrost Button Testing', () => {
    it('should test combination in button component', async () => {
        // Go to URL
        await browser.url(`${browser.options.baseUrl}button--primary`);

        // log types: ['browser', 'driver', 'client', 'server(deprecated)']
        const browserLogs = await browser.getLogs('browser')
        // const driverLogs = await browser.getLogs('driver')
        // const clientLogs = await browser.getLogs('client')

        console.log(`browserLogs ${browserLogs}`)
        let warningErrorInBrowserLogs = key => browserLogs.some(obj => Object.keys(obj)[0].includes(key));
        let isKeyPresent = warningErrorInBrowserLogs('WARNING') || warningErrorInBrowserLogs('SEVERE') 
        console.log(`errs ${isKeyPresent}`)
        // console.log(`driverLogs ${driverLogs}`)
        // console.log(`clientLogs ${clientLogs}`)
        // console.log(`serverLogs ${serverLogs}`)
        // assert.strictEqual("1", "2", "err")
        assert.isFalse(isKeyPresent)
        
    })
})

