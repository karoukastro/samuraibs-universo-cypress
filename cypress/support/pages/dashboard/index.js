import {el} from './elements'

import header from '../../components/header'

class DashboardPage{

    constructor(){
        this.header = header
    }
    
    go(){
        cy.visit('/dashboard')
    }


}

export default new DashboardPage()