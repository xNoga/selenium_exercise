const { Builder, By, Key, until } = require('selenium-webdriver');
const axios = require('axios')

//TODO lav beforeAll og afterAll

let driver

beforeAll(async () => {
    try {
        driver = await new Builder().forBrowser('chrome').build()
        await driver.get('http://localhost:3000/')
    } finally {
        console.log("driver has been set up")
    }
})

test('Case 1 - Looking for 5 rows in the cars table', async () => {
    try {
        let el = await driver.findElement(By.id('tbodycars'));
        let children = await el.findElements(By.xpath('.//tr'))
        expect(children.length).toBe(5)
    } finally {
    }
});

test('Case 2 - Looking for 2 rows with input 2002', async () => {
    try {
        await driver.findElement(By.id('filter')).sendKeys('2002', Key.RETURN)

        let table = await driver.findElement(By.id('tbodycars'));
        let children = await table.findElements(By.xpath('.//tr'))
        expect(children.length).toBe(2)
    } finally {
    }
});

test('Case 3 - Clearing the input field and look for 5 rows', async () => {
    try {
        await driver.findElement(By.id('filter')).sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE)

        let table = await driver.findElement(By.id('tbodycars'));
        let children = await table.findElements(By.xpath('.//tr'))
        expect(children.length).toBe(5)
    } finally {
    }
});

test("Case 4 - Pressing the sort button and look for correct id's", async () => {
    try {
        // let element = await driver.findElement(By.xpath('//table/thead/tr/th[2]')).getText()
        // console.log(element)
        await driver.findElement(By.id('h_year')).click()
        let table = await driver.findElement(By.id('tbodycars'));
        let id1 = await driver.findElement(By.xpath('.//tr[1]/td[1]')).getText()
        expect(id1).toBe("938")
        let id2 = await driver.findElement(By.xpath('.//tr[5]/td[1]')).getText()
        expect(id2).toBe("940")
    } finally {
    }
});

test("Case 5 - Edit description for car with id 938", async () => {
    try {
        let el = await driver.findElement(By.xpath('.//tr[1]/td[8]/a[1]')).click()
        let desc = await driver.findElement(By.id('description'))
        await desc.clear()
        await desc.sendKeys('Cool car')
        await driver.findElement(By.id('save')).click()
        let text = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[2]/td[6]')).getText()
        expect(text).toBe('Cool car')
    } catch (err) {
    }
});

test("Case 6 - Press new car, save car, check for error", async () => {
    try {
        await driver.findElement(By.id('new')).click()
        await driver.findElement(By.id('save')).click()
        let error = await driver.findElement(By.id('submiterr')).getText()
        expect(error).toBe('All fields are required')
    } catch (err) {
    }
});

test("Case 7 - Press new car and add new car", async () => {
    try {
        await driver.findElement(By.id('new')).click()
        await driver.findElement(By.id('year')).sendKeys('2008')
        await driver.findElement(By.id('registered')).sendKeys('2002-05-05')
        await driver.findElement(By.id('make')).sendKeys('Kia')
        await driver.findElement(By.id('model')).sendKeys('Rio')
        await driver.findElement(By.id('description')).sendKeys('As new')
        await driver.findElement(By.id('price')).sendKeys('31000')
        await driver.findElement(By.id('save')).click()
        
        let el = await driver.findElement(By.id('tbodycars'));
        let children = await el.findElements(By.xpath('.//tr'))
        expect(children.length).toBe(6)

        let id = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[6]/td[1]')).getText()
        let year = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[6]/td[2]')).getText()
        let reg = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[6]/td[3]')).getText()
        let make = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[6]/td[4]')).getText()
        let model = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[6]/td[5]')).getText()
        let desc = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[6]/td[6]')).getText()
        let price = await driver.findElement(By.xpath('//*[@id="tbodycars"]/tr[6]/td[7]')).getText()
        expect(id).toBe("942")
        expect(year).toBe("2008")
        expect(reg).toBe('5/5/2002')
        expect(make).toBe("Kia")
        expect(model).toBe("Rio")
        expect(desc).toBe("As new")
        expect(price).toBe("31000")
        
    } catch (err) {
    }
});

afterAll(async () => {
    try {
        await driver.quit();
        console.log("driver has been shut down")
        await axios.get('http://localhost:3000/reset')   
    } catch (e) {
        console.log("error")
    }
})