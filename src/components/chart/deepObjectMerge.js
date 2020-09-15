/*
 * @version: 1.0.1
 * @Author: wang kai
 * @Date: 2020-07-06 17:13:03
 * @LastEditors: wang kai
 * @LastEditTime: 2020-07-06 17:13:43
 * @Description: 合并对象
 * @Update: 更新内容
 */

/**
 * 合并对象
 * @param FirstOBJ
 * @param SecondOBJ
 * @returns {*}
 */
const deepObjectMerge = (FirstOBJ, SecondOBJ) => {
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() ===
        "[object Object]" ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
}

export default deepObjectMerge;
