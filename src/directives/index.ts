import clickOutside from './clickOutside'


export default {
    install(app: any) {
        app.directive('clickOutside', clickOutside)
    }
}
