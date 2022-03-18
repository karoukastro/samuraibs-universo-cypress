import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    context('quando o usuario eh novato', function () {

        const user = {
            name: 'Carolina Castro',
            email: 'carol@testing.com',
            password: 'Carolina1!'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })


        it('deve castrar novo usuario', function () {

            signupPage.go()
            signupPage.form(user)

            //    cy.intercept('POST', '/users', {
            //        statusCode: 200
            //    }).as('postUser')

            signupPage.submit()
            //   cy.wait('@postUser')
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })


    })

    context('quando o email ja existe', function () {

        const user = {
            name: 'Carolzinha2',
            email: 'carolzinha@testing.com',
            password: 'Carolina1!',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('nao deve cadastrar o usuario', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')


        })

    })

    context('quando o email eh incorreto', function () {

        const user = {
            name: 'Elizabeth Luz',
            email: 'liza.yahoo.com',
            password: 'Carolina1!',
            is_provider: true
        }

        it('deve exibir msg de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '12', '123', '1234', '12345']

        beforeEach(function () {
            signupPage.go()

        })

        passwords.forEach(function (p) {

            it('nao deve cadastrar com a senha: ' + p, function () {
                const user = { name: 'Jason Friday', email: 'jasn@gmail.com', password: p }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando nao preencho nenhum dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória',
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLocaleLowerCase(), function(){
                signupPage.alertHaveText(alert)
            })
        })
    })
})