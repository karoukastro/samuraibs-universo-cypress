import signupPage from '../support/pages/signup'
import login from '../support/pages/login'
import header from '../support/components/header'

describe('Login', function () {

    const user = {
        name: 'Carolina Castro',
        email: 'carol@testing.com',
        password: 'Carolina1!'
    }

    context('quando o usuario ja esta cadastrado', function () {

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })


        it('Login com sucesso', function () {

            login.go()
            login.form(user)
            login.submit()
            header.shouldHaveText(user.name)
        })
    })

    context('quando a senha é incorreta', function () {

        it('deve exibir toast de alerta', function () {

            user.password = '123456'

            login.go()
            login.form(user)
            login.submit()
            login.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('quando email está no formato invalido', function () {

        it('deve exibir msg de alerta', function () {

            user.email = 'carol.com.br'

            login.go()
            login.form(user)
            login.submit()
            login.alertHaveText('Informe um email válido')
        })
    })

    context('quando nao preencho nenhum dos campos', function () {

        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória',
        ]

        before(function () {
            login.go()
            login.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLocaleLowerCase(), function () {
                login.alertHaveText(alert)
            })
        })
    })

})