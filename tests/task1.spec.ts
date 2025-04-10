import {expect, test ,Page} from '@playwright/test'


const mainUrl: string = 'https://www.saucedemo.com/';

async function clickMe(page:Page, selector:string){
    await page.locator(selector).click()
}

async function loginOP(page:Page,userName:string,passWord:string) {
    await page.goto(mainUrl);
    await page.locator('[id="user-name"]').fill(userName)
    await page.locator('[id="password"]').fill(passWord)
    await clickMe(page ,'[id="login-button"]')
}




test ('Test Case 01: Test successful login on saucedemo',async({page})=>{
    await loginOP (page,'standard_user','secret_sauce')
    await expect(page.locator('[id="react-burger-menu-btn"]')).toBeVisible()
    await clickMe(page,'[id="react-burger-menu-btn"]')
    await clickMe(page, '[id="logout_sidebar_link"]')
    console.log("1st test case done")    
})


test ('Test Case 2: Test login with invalid credentials on saucedemo',async({page})=>{
    await loginOP (page,'invalid_user','invalidPassword')
    await expect(page.locator('[data-test="error"]')).toHaveText(/.*do not match any/)
    console.log("2nd test case done")    
})


test ('Test Case 3: Test login with a locked account on saucedemo',async({page})=>{
    await loginOP (page,'locked_out_user','secret_sauce')
    await expect(page.locator('[data-test="error"]')).toHaveText(/.*locked out./)
    console.log("3rd test case done")    
})