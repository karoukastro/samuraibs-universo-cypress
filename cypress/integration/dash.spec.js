import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'


describe('dashboard', function(){

    context('quando o clinete faz um agendamento no app mobile', function(){

        const data = {
            customer: {
                name: 'Caio',
                email: 'caiao@gmail.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@gmail.com',
                password: 'pwd123',
                is_provider: true
            },
            appoitmentHour: '14:00'
        }

        before(function(){
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            cy.apiLogin(data.customer)
            cy.log('Token: ' +  Cypress.env('apiToken'))
            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appoitmentHour)
        })

        it('o mesmo deve ser exibido no dashboard', function(){
            cy.log('O Id do Ramon eh ' + Cypress.env('providerId'))
            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()
            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)

            dashPage.appoitmentShouldBe(data.customer, data.appoitmentHour)
        })
    })
})

import moment from 'moment'

Cypress.Commands.add('createAppointment', function(hour){ 

    let now = new Date()
    now.setDate(now.getDate() +1)

    const date = moment(now).format('YYYY-MM-DD ' + hour + ':00')

    Cypress.env('appointmentDay', now.getDate())

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function(response){
        expect(response.status).to.eq(200)
    })
})



Cypress.Commands.add('setProviderId', function(providerEmail){
    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function(response){
        expect(response.status).to.eq(200)
        console.log(response.body)

        const providerList = response.body

        providerList.forEach(function(provider){
            if(provider.email == providerEmail){
                Cypress.env('providerId', provider.id)
            }
        })


    })
})


Cypress.Commands.add('apiLogin', function(user){
    const payload = {
        email: user.email,
        password: user.password
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function(response){
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})