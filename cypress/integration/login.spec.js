
import { loginDatoms } from "../support/login.page";

describe('Login Functionality for Datoms',()=>{
    it('Login for Datoms',()=>{
        loginDatoms.open()
        loginDatoms.login()

    })
    it('verify email id field',()=>{
        loginDatoms.open()
        loginDatoms.verifyemailfield()

    })
    it('verify forgot password link',()=>{
        loginDatoms.open();
        loginDatoms.forgotpassword()
    })
    it('verify blank username password fields',()=>{
        loginDatoms.open();
        loginDatoms.verifyblank_username_password()
        loginDatoms.emptyemail()
        loginDatoms.emptypassword()
    })

})

