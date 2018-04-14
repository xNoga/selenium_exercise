# selenium_exercise

I have not pushed all the remaining code as I thought you might already have it. I have only pushed the test-file, package.json and images.
I hope that's sufficient.

## Test results
![](https://github.com/xNoga/selenium_exercise/blob/master/img/Screen%20Shot%202018-04-14%20at%2011.11.22.png)

## Setup
I chose to use the selenium-webdriver. It is basically the same as the Java driver but there are some minor differences. 
In order for the driver to work you have to place the chromedriver in the root of the project and then require the driver.
Otherwise it's the same. 
I'm using Jest as my test framework. The setup and syntax is pretty basic and should be easy to read. 
The command 
```
npm test --runInBand
```
runs the tests and the **--runInBand** command makes sure the tests execute in order. 

My project structure looks as follows: 

![](https://github.com/xNoga/selenium_exercise/blob/master/img/Screen%20Shot%202018-04-14%20at%2011.10.01.png)

(The *tests* package is under the src package)
