import CryptoJS from 'crypto-js'
/**
 * Vue的插件，用来获取和设置localStorage存储
 **/
export const local = {
	set(key, value) {
		window.localStorage[key] = value;
	},
	//读取单个属性
	get(key, defaultValue) {
		return window.localStorage[key] || defaultValue;
	},
	//存储对象，以JSON格式存储
	setObject(key, value) {
		window.localStorage[key] = JSON.stringify(value);
	},
	//读取对象
	getObject(key) {
		return JSON.parse(window.localStorage[key] || '{}');
	},
	//删除单个对象
	remove(key) {
		window.localStorage.removeItem(key);
	},
	//删除所有
	removeAll() {
		window.localStorage.clear();
	}
};

/**
 * util 常用方法
 **/

export const utils = {
	// 拷贝
	copy(data) {
		return JSON.parse(JSON.stringify(data));
	},
	deepClone(obj) {
		if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0; i < obj.length; i++) {
                copy.push(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Object) {
            var copy = {};
            for (var key in obj) { //递归 
                if (obj.hasOwnProperty(key)) {
                    copy[key] = utils.deepClone(obj[key]);
                }
            }
            return copy;
        }
	},
	copyArr(arr){
        return arr.map((e)=>{
            if(typeof e === 'object'){
                return Object.assign({},e)
            }else{
                return e
            }
        })
    },
	//多维数组 转 一维 对象
	repeat(data, name) {
		let obj = {};
		let format = (data) => {
			for(var i = 0, j = data.length; i < j; i++) {
				var item = this.copy(data[i]);
				item.children = null;
				obj[item[name]] = item;

				data[i].children && format(data[i].children);
			}
		}
		format(data);
		return obj;
	},
	endTime(date, type){
        let DATE = new Date(+date);
        let year = DATE.getFullYear(),
            month = DATE.getMonth() + 1,
            day = DATE.getDate();
        let time;

        if(type == 'year'){
            time = new Date(year+1, 0, 0, 23, 59, 59);
        }else if(type == 'month'){
            time = new Date(year, month-1, 0, 23, 59, 59);
        }else if(type == 'day'){
            time = new Date(year, month-1, day, 23, 59, 59);

        }else{
            return new Date().getTime();
        }
        
        return time.getTime();
    },
	// md5
	MD5(str) {
		return str ? CryptoJS.MD5(str).toString() : '';
	},
	// 登录加密
	enCryption(data) {
		var a1 = data.loginName + ':' + local.getObject('session').realm + ':' + utils.MD5(data.authorizeCode),
			a2 = 'POST:/auth/v1/login',
			ha1 = utils.MD5(a1),
			ha2 = utils.MD5(a2);

		data.authorizeCode = utils.MD5(ha1 + ':' + local.getObject('session').nonce + ':' + ha2);
		return data;
	},
	//加密
	enDES(data) {
		var key = 'RUYUKEY1'; //密钥
		var iv = 'RUYUKEY2';

		var key = CryptoJS.enc.Utf8.parse(key);
		var iv = CryptoJS.enc.Utf8.parse(iv);
		var encrypted = CryptoJS.DES.encrypt(data, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	},
	//解密
	deDES(data) {
		var key = 'RUYUKEY1'; //密钥
		var iv = 'RUYUKEY2';

		var key = CryptoJS.enc.Utf8.parse(key);
		var iv = CryptoJS.enc.Utf8.parse(iv);
		var decrypted = CryptoJS.DES.decrypt(data, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8); //
	}
};
export default {
	install: function(vm) {
		vm.prototype.$local = local
		vm.prototype.$utils = utils
	}
}
