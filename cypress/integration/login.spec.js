import signupPage from '../support/pages/signup'
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'

describe('Login', function () {

    const user = {
        name: 'Carolina Castro',
        email: 'carol@testing.com',
        password: 'Carolina1!',
        is_provider: true
    }

    context('quando o usuario ja esta cadastrado', function () {

        before(function () {
            cy.postUser(user)
        })

        it('Login com sucesso', function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('quando o usuario é bom mas a senha é incorreta', function () {

        let user = {
            name: 'Celso Kamura',
            email: 'celso@testing.com',
            password: 'Carolina1!',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function(){
                user.password = '123456'
            })
        })

        it('deve notificar erro de credenciais', function () {


            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            
            loginPage.toast.shouldHaveText(message)
        })
    })

    context('quando email está no formato invalido', function () {

        const emails = [
            'carol.com.br',
            'yahoo.com.br',
            '@gmail.com',
            '@',
            'carol@',
            '111',
            '&*^&^&*',
            'xpto123'
        ]

        before(function(){
            loginPage.go()
        })

        emails.forEach(function(email){
            it('nao deve logar com o email: ' + email, function () {

                const user = {email: email, password: 'pwd123'}
                
                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })


    })

    context('quando nao preencho nenhum dos campos', function () {

        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória',
        ]

        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLocaleLowerCase(), function () {
                loginPage.alert.haveText(alert)
            })
        })
    })

})