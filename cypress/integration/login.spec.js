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

    context('quando a senha é incorreta', function () {

        it('deve exibir toast de alerta', function () {

            user.password = '123456'

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('quando email está no formato invalido', function () {

        it('deve exibir msg de alerta', function () {

            user.email = 'carol.com.br'

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.alertHaveText('Informe um email válido')
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
                loginPage.alertHaveText(alert)
            })
        })
    })

})