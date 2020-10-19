import { Header , Footer , Login ,Register ,Password ,Index ,List ,User} from './resolve'
export const routes = [
	{
        path: '/',
        name: '',
        redirect: {
            name: 'index'
        }
    },
    {
        path: '/index',
        name: 'index',
        components: {
        	header:  Header,
            content: Index,
            footer: Footer
        },
         props: {
         	header: true,
         	content: true,
         	footer: true 
         },
         meta:{
                title: "首页"            
         }
    },
    {
        path: '/login',
        name: 'login',
        components: {
        	header:  Header,
            content: Login,
            footer: Footer
            
        },
         props: {
         	content: true,
         },
         meta:{
                title: "登录"            
         }
    },
    {
        path: '/register',
        name: 'register',
        components: {
            content: Register,
        },
         props: {
         	content: true,
         },
         meta:{
                title: "注册"            
         }
    },
    {
        path: '/password',
        name: 'password',
         components: {
         	header:  Header,
            content: Password,
            footer: Footer
        },
         props: {
         	header: true,
         	content: true,
         	footer: true 
         },
         meta:{
                title: "修改密码"            
         }
           
    },
    {
        path: '/list',
        name: 'list',
       components: {
         	header:  Header,
            content: List,
            footer: Footer
        },
         props: {
         	header: true,
         	content: true,
         	footer: true 
         },
         meta:{
                title: "浏览页"            
         }
           
    },
    {
        path: '/user',
        name: 'user',
        components: {
         	header:  Header,
            content: User,
            footer: Footer
        },
         props: {
         	header: true,
         	content: true,
         	footer: true 
         },
         meta:{
                title: "用户中心页"            
         }
    },
    {
        path: '/*',
        redirect: {
            name: 'index'
        }
    },
]
