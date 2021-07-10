
import loginObj from 'D:/datoms/cypress/fixtures/logindata.json';

export default class LoginDatoms {
    open() {
        cy.visit('https://accounts.datoms.io/login')//visiting url
    }

    login() {

        cy.get(loginObj.id).should('be.visible')//checking whether the field is visible
        cy.get(loginObj.id).clear().type('test@gmail.com')//enter value in the id field
        cy.get(loginObj.password).should('be.visible')//check whther the password field is visible
        cy.get(loginObj.password).clear().type('password')//type passwprd in the password field
        cy.get(loginObj.Login).click()//click on Login button
        cy.wait(2000)
        cy.get(loginObj.Error_message).then($text => {
            if ($text.text() == 'The password provided is invalid!') {
                cy.log("Wrong user credentials")
            }
            else {
                cy.log("User logged in successfully")
            }
        })

    }
    verifyemailfield() {
        cy.get(loginObj.id).should('be.visible')//checking whether the field is visible
        cy.get(loginObj.id).clear().type('test')//entering invalid value in the id field
        cy.get(loginObj.password).should('be.visible')//check whther the password field is visible
        cy.get(loginObj.password).clear().type('password')//type passwprd in the password field
        cy.get(loginObj.Login).click()//click on Login button
        cy.wait(2000)
        cy.get(loginObj.Error_message).then($text => {//validating error message 
            if ($text.text() == 'Please enter a valid email!') {//onclick of login button if we get text 'Please enter a valid email!'check the id field here in this case i have just logged message as I dnt have valid credentials
                cy.log("Wrong user credentials")
            }
            else {
                cy.log("User logged in successfully")
            }
        })
    }
    forgotpassword() {
        cy.get(loginObj.forgot_password).should('be.visible');//forgot password link should be visible
        cy.get(loginObj.forgot_password).click();//click on the forgot password link
        cy.wait(500)
        cy.get(loginObj.Pannel).should('be.visible')//on click of the forgot password link Recovery account pannel should be opend
        cy.wait(2000)
        cy.get(loginObj.id).clear().type('test@gmail.com')//enter mail id in the id field
        cy.get(loginObj.RecoverAccount).click()//click on recover account
        cy.xpath('//*[@id="show_message"]').then($text => {//validate the message that appears when the mail id is not registered
            var test = $text.text()
            cy.log(test)
            if ($text.is(':visible')) {//if the mesage is visible then click on Back to Login 
                cy.log("Email id was not registered")
                cy.get(loginObj.Back_to_Login).click()
                cy.wait(2000)
                cy.get(loginObj.Pannel).should('be.visible')//on click of the Back to login it should navigate to login screen
            }
            else {
                cy.log("User logged in successfully")
            }
        })


    }
    verifyblank_username_password() {
        cy.get(loginObj.Login).click()//click on the Login button without entering email and password
        cy.get(loginObj.Error_message).should('have.text', 'Email field cannot be empty!')//An error message should  be displayed

    }
    emptyemail() {
        cy.get(loginObj.password).clear().type('password')//enter password only
        cy.get(loginObj.Login).click()//click on Login
        cy.get(loginObj.Error_message).should('have.text', 'Email field cannot be empty!')//An error message should  be displayed
    }
    emptypassword() {
        cy.get(loginObj.id).clear().type('test@gmail.com')//enter value in the id field
        cy.get(loginObj.password).clear()
        cy.get(loginObj.Login).click()//click on Login
        cy.get(loginObj.Error_message).should('have.text', 'Password field cannot be empty!')//An error message should  be displayed
    }

}
export const loginDatoms = new LoginDatoms();