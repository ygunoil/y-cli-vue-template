// 公共部分
export const Header = resolve =>  require(["@/components/header/index"], resolve)
export const Footer = resolve =>  require(["@/components/footer/index"], resolve)

// 登录
export const Login = resolve =>  require(["@/pages/login/index"], resolve)
// 注册
export const Register = resolve =>  require(["@/pages/register/index"], resolve)
// 密码
export const Password = resolve =>  require(["@/pages/password/index"], resolve)
// 首页
export const Index = resolve =>  require(["@/pages/home/index"], resolve)
// 浏览页
export const List = resolve =>  require(["@/pages/list/index"], resolve)
// 个人中心页
export const User = resolve =>  require(["@/pages/user/index"], resolve)