const LENGTHLIMIT = {
    password: 20,
    goods: 10,
}

/**
 * 检查项目中各种数据的格式
 */

/**
 * 检查price是否为正数
 * @param {数字价格} price 
 */
export function checkPrice(price) {
    price = parseFloat(price);
    if (price > 0) {
        return true;
    }
    return false;
}

/**
 * 检查商店配送范围是否为正
 * @param {商店配送范围} deliveryRange 
 */
export function checkDeliveryRange(deliveryRange) {
    deliveryRange = parseFloat(deliveryRange);
    if (deliveryRange > 0) {
        return true;
    }
    return false;
}

/**
 * 检查上架量及库存为非负数且上架量不超过库存
 * @param {整数上架量} remaining 
 * @param {整数库存} inventory
 */
export function checkRemaining(remaining, inventory) {
    remaining = parseInt(remaining);
    inventory = parseInt(inventory);
    if (remaining >= 0 && inventory >= remaining) {
        return true;
    }
    return false;
}

/**
 * 检查字符串长度是否符合规定
 * @param {数据的类型} info 
 * @param {数据值} val 
 */
export function checkLength(info, val) {
    return val.length <= LENGTHLIMIT[info];
}

/**
 * 判定val非空
 * @param {待判定的数值} val 
 */
export function checkNotNull(val) {
    return val !== null && val !== '' && val !== undefined;
}

/**
 * 检查json的属性不为空
 * @param {json对象} json 
 * @param {要遍历的属性} infos 
 */
export function checkJsonNotNull(json, infos = []) {
    let flag = true;
    infos.forEach((info) => {
        if (!checkNotNull(json[info])) {
            flag = false;
        }
    })
    return flag;
}

/**
 * 检查json是否变化过
 * @param {改动前的json} former 
 * @param {改动后的json} latter 
 */
export function checkNotChange(former, latter) {
    let infos = Object.keys(former);
    let latterInfos = Object.keys(latter);
    if (latterInfos.length !== infos.length) {
        return false;
    }
    let flag = true;
    infos.forEach((info) => {
        if (latter[info] !== former[info]) {
            flag = false;
        }
    })
    return flag;
}

export function checkPositive(info) {
    return parseFloat(info) > 0;
}

export function checkNotNegetive(info) {
    return parseFloat(info) >= 0;
}