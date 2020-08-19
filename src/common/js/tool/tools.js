/**
 * @DATE:  2019-12-18 13:44
 * @Version: 0.0.1
 * @Author: yunchangJia
 * @Description: 工具类封装一些公共方法
 * @Update: 更新内容 by yunchangJia 2019-12-18 13:44
 */
let tools = {};

/**
 * 合并对象
 * @param FirstOBJ
 * @param SecondOBJ
 * @returns {*}
 */
tools.deepObjectMerge = (FirstOBJ, SecondOBJ) => {
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() ===
        "[object Object]" ? tools.deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
}

export default tools;
