import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    before(function(){
        cy.fixture('signup').then(function(signup){
            this.sucess = signup.sucess
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('quando o usuario eh novato', function () {

        before(function () {
            cy.task('removeUser', this.sucess.email)
                .then(function (result) {
                    console.log(result)
                })
        })


        it('deve castrar novo usuario', function () {

            signupPage.go()
            signupPage.form(this.sucess)

            //    cy.intercept('POST', '/users', {
            //        statusCode: 200
            //    }).as('postUser')

            signupPage.submit()
            //   cy.wait('@postUser')
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })


    })

    context('quando o email ja existe', function () {

        before(function () {
            cy.postUser(this.email_dup)
        })

        it('nao deve cadastrar o usuario', function () {

            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')


        })

    })

    context('quando o email eh incorreto', function () {

        it('deve exibir msg de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '12', '123', '1234', '12345']

        beforeEach(function () {
            signupPage.go()

        })

        passwords.forEach(function (p) {

            it('nao deve cadastrar com a senha: ' + p, function () {

                this.short_password.password = p
                
                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
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
                signupPage.alert.haveText(alert)
            })
        })
    })
})