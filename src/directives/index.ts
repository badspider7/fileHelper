import tooltip from './tooltip'

const directives = {
    tooltip
}

export default {
    install(app: any) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key])
        })
    }
}
