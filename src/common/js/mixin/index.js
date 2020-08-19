/**
 * @DATE:  2019/6/27 09:47
 * @Version: 0.0.1
 * @Author: yunchangJia
 * @Description: 全局混入
 * @Update: 1、新增darkTheme--用来设置主体内容为黑（深）色的主题 2、将公共样式文件从项目内部迁移到外层，故在此文件修改加载路径 by huhaiou 2020/1/8 11:31 AM
 */
export default {
    computed: {
        /* 主题（多种颜色主题：deepBlue、wpgRed...） */
        currentTheme() {
            return this.$store.state.setting.theme;
        },
        /* 基础主题（主体内容部分：黑白（深浅）主题） */
        baseTheme() {
            return (this.$store.state.setting.darkTheme.indexOf(this.currentTheme) > -1) ? 'dark' : 'light';
        },
        /* 菜单布局方式 */
        layoutSite() {
            /* html 标签添加 布局方式 */
            document.getElementsByTagName("html")[0].className = this.$store.state.setting.layout + ' ' + this.currentTheme + ' ' + this.baseTheme;
            return this.$store.state.setting.layout;
        }
    },
    methods:{
        /**
         * 动态加载样式--文件无法获取时捕获异常，并默认设置主题为wpg红色主题，并加载对应该样式
         */
        getLess() {
            if (this.currentTheme === "") return false;
            try {
                return require(`@common/theme/${this.currentTheme}/index.less`);
            } catch (e) {
                this.$store.commit('setting/setTheme', 'sunnyBlue');
                return require(`@common/theme/sunnyBlue/index.less`);
            }
        },

        /**
         * 动态图片 （非seo项目建议图片放到背景图片中通过css加载 防止主题过多公用图片重复）--图片无法获取时捕获异常，并默认不加载
         * @param filePath 【文件路径】
         * @param fileName 【图片全称】
         */
        getImg(filePath, fileName) {
            if (this.currentTheme === "") return false;
            try {
                return require(`@common/theme/${this.currentTheme}/${filePath}/${fileName}`);
            } catch (e) {
                return '';
            }
        }
    }
};
