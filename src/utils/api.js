import { $http } from './http'

// 基础数据版本
export const getBaseData = params => {
  return $http.get('api/basedata/v1/version',params);
}
