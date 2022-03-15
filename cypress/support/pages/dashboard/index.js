import {el} from './elements'

import toast from '../../components/toast'

class DashboardPage{

    go(){
        cy.visit('/dashboard')
    }

}

export default new DashboardPage()