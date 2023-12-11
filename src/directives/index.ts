import clickOutside from './clickOutside'
import tooltip from './tooltip'


export default {
    install(app: any) {
        app.directive('clickOutside', clickOutside)
        app.directive('tooltip', tooltip)
    }
}
