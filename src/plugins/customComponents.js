/**
 * 全局注册自定义组件
 * @param app
 */
import SvgIcon from '@/icons';
console.log(SvgIcon, 'sssssssssssss')
export function setupCustomComponents(app) {
    console.log(app, 'sssssssssssss')
    app.component(SvgIcon.name, SvgIcon);
}