import { expect } from '@playwright/test';
import { test, processJson } from '../utilities/Base';

/*
this also end to end test but there are two main differences 
    1- pages are implemented through custom features from Base.ts in Utilities
    2- it's DataDriven with Finer control to test certain data only 
        or to skip others and the sky here is the limit 
*/

//process JSON Data + .env Variables
let resolvedData = processJson();

for (const dataSet of resolvedData) { 
    // const runner = dataSet.email === "one@two.com"? test.only : test; //test only this data
    // const runner = dataSet.email === "one@two.com"? test.skip : test; //test all data except this one 

    test(`end to end test for ${dataSet.email}`, 
        async ({loginPage, prodPage, payPage, basePage, orderPage, cartPage, thnksPage }) => {
    const mail1: string = dataSet.email;
    const pass: string = dataSet.pass;
    const country: string = dataSet.country;
    let searchItems: string[] = dataSet.products;
    let selectedCountry: string;
    let orderIds: string[];

    await test.step('Login with valid credentials', async () => {
        await loginPage.goTo();
        await loginPage.validLogin(mail1, pass);
        await loginPage.login();
    });

    await test.step('Add products to cart', async () => {
        await prodPage.waitToLoad();
        await prodPage.addItemstoCart(searchItems);
        await prodPage.goToCart();
    });

    await test.step('Verify cart contents and proceed to checkout', async () => {
        await cartPage.waitToLoad();
        const missingItems = await cartPage.validateList(searchItems);
        console.log("Missing items count =>", missingItems.length);
        expect(missingItems.length, 'All ordered items should be present in cart').toBe(0);
        await cartPage.checkout();
    });

    await test.step('Validate shipping information and place order', async () => {
        const mail2 = await payPage.getMail();
        expect(mail2 === mail1).toBeTruthy();

        // Verify country selection validation
        await payPage.placeOrder();
        const toastmsg = await basePage.getToastMessage();
        expect(toastmsg?.includes("Please Enter Full Shipping Information")).toBeTruthy();

        // Complete order with valid country
        selectedCountry = await payPage.selectCountry(country);
        await payPage.placeOrder();
    });

    await test.step('Verify order confirmation', async () => {
        const message = await thnksPage.waitToLoad();
        expect(message?.includes("Thankyou for the order")).toBeTruthy();
        orderIds = await thnksPage.getIDs();
        await thnksPage.goToOrders();
    });

    await test.step('Validate order details in order history', async () => {
        await orderPage.waitToLoad();
        const idsList = await orderPage.getOrdersIds();
        const filteredItems = orderIds.filter((orderId: string) =>
            !idsList.some(s => s?.includes(orderId))
        );
        expect(filteredItems.length).toBe(0);

        await orderPage.prodView();
        const country2 = await orderPage.getCountry();
        expect(selectedCountry === country2).toBeTruthy();
        console.log("Finish Line");
    });
    /* */
});
}