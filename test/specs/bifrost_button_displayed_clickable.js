const { expect, browser, $ , $$} = require('@wdio/globals')
const { assert } = require('chai');

describe('Bifrost Button Testing -> @sanity', () => {
    it('should test consolelogs in button component -> @smoke', async () => {
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
    it('should test combination in button component -> @regression', async () => {
        // Go to URL
        await browser.url(`${browser.options.baseUrl}button--primary`);

        // Switch to storybook canvas iframe
        const storybookCanvasIframeSelector = `#storybook-preview-iframe`
        const storybookCanvasIframeSelectorItems = await $(storybookCanvasIframeSelector)
        await browser.switchToFrame(storybookCanvasIframeSelectorItems)

        // check whether root exists (storybook canvas loaded properly)
        const rootSelector = `#root`
        const rootSelectorItems = await $(rootSelector)
        await rootSelectorItems.waitForExist({ timeout: 10000 });

        // Perform Validations on button
        const buttonSelector = `button[aria-label = "Button example"]`
        const buttonItem = await $(buttonSelector)
        await buttonItem.waitForExist({ timeout: 5000 });
        await buttonItem.waitForDisplayed({ timeout: 5000 });
        await expect(buttonItem).toBeDisplayed()
        await expect(buttonItem).toHaveTextContaining(
            'Button')
        await buttonItem.waitForClickable({ timeout: 3000 });
        await expect(buttonItem).toBeClickable()
        await buttonItem.click()
        
        // Switch to Parent Frame
        await browser.switchToParentFrame()

        // Toggle controls for Variant
        const controlsSelector = '[id*="tabbutton-controls"]'
        const controlsSelectorItems = await $(controlsSelector)
        await controlsSelectorItems.waitForClickable({ timeout: 3000 });
        await expect(controlsSelectorItems).toBeClickable()
        await controlsSelectorItems.click()
        
        const controlVariantsSelector = '[id*="control-variant"]'
        const controlVariantsSelectorItems = await $$(controlVariantsSelector)
        controlVariantsSelectorItems.forEach((controlVariantsSelectorItem) =>{
            controlVariantsSelectorItem.click()
        })
        // for verifying need to switch back to iframe

        // Disable and check if disabled
        const initilaDisabledSelector = '[id*="set-disabled"]'
        const initilaDisabledSelectorItems = await $(initilaDisabledSelector)
        const disabledSelector = '[id*="control-disabled"]'
        const disabledSelectorItems = await $(disabledSelector)
        await initilaDisabledSelectorItems.click()
        await disabledSelectorItems.click()

        await browser.switchToFrame(storybookCanvasIframeSelectorItems)
        await buttonItem.waitForExist({ timeout: 5000 });
        await buttonItem.waitForDisplayed({ timeout: 5000 });
        await expect(buttonItem).toBeDisplayed()
        await expect(buttonItem).toHaveTextContaining(
            'Button')
        await expect(buttonItem).toBeClickable({reverse : true})
    })
})

