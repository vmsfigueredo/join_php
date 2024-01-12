// ** Type import
import {VerticalNavItemsType} from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'bx:home-circle',
    },

    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'bx:envelope',
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'bx:shield',
    // }
    {
      path: '/produtos',
      title: 'Produtos',
      icon: 'bx:package'
    },
    {
      path: '/categorias',
      title: 'Categorias',
      icon: 'bx:category'
    }
  ]
}

export default navigation
