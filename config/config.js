var config={

    mysql:{
        development:{
            host     : '112.196.87.42',
            user     : 'gurpreet_r',
            password : '162ZNpeY7ekxadss',
            database : 'instareply_local'
        },production:{
            host     : '66.115.154.74',
            user     : 'leadsboy_instant',
            password : '&Mg.K=FfK@Co',
            database : 'leadsboy_instantreply'
        }
    },
    mongo:{
        development:{
            host     : 'localhost',
            user     : '',
            password : '',
            database : 'UserManagement'
        },production:{
            host     : '66.115.154.74',
            user     : 'leadsboy_instant',
            password : '&Mg.K=FfK@Co',
            database : 'leadsboy_instantreply'
        }
    }
}

module.exports = config;