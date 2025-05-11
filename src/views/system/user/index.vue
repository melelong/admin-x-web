<script setup lang="ts">
import {reactive, ref} from "vue";
import {SearchOutlined, ReloadOutlined, PlusOutlined} from '@ant-design/icons-vue'
import UserFormModal from './components/UserFormModal/index.vue'

const userFormModalRef = ref()
const formState = reactive({
  username: '',
  nickname: ''
})

interface UserInfo {
  name: string,
  nickname: string,
  age: number,
  address: string
}

const columns = [
  {
    title: '序号',
    customRender: ({index}) => index + 1
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '年龄',
    key: 'age',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    width: '160px',
  },
];
const dataSource = reactive([
  {name: '格子立春版', nickname: '霹雳火', age: 22, address: '北京市朝阳区'},
  {name: '格子雨水版', nickname: '急先锋', age: 24, address: '上海市浦东新区'},
  {name: '格子惊蛰版', nickname: '力霸天', age: 19, address: '广州市天河区'},
  {name: '格子春分版', nickname: '冲击波', age: 21, address: '深圳市福田区'},
  {name: '格子清明版', nickname: '龙卷风', age: 25, address: '成都市锦江区'},
  {name: '格子谷雨版', nickname: '超音速', age: 18, address: '杭州市西湖区'},
  {name: '格子立夏版', nickname: '风火轮', age: 23, address: '武汉市江汉区'},
  {name: '格子小满版', nickname: '猛虎王', age: 20, address: '重庆市江北区'},
  {name: '格子芒种版', nickname: '狂野猩', age: 22, address: '天津市河西区'},
  {name: '格子夏至版', nickname: '蓝毒兽', age: 24, address: '南京市鼓楼区'},
  {name: '格子小暑版', nickname: '银铁兽', age: 19, address: '西安市雁塔区'},
  {name: '格子大暑版', nickname: '金铁兽', age: 21, address: '长沙市岳麓区'},
  {name: '格子立秋版', nickname: '绿豹兽', age: 25, address: '苏州市姑苏区'},
  {name: '格子处暑版', nickname: '紫龙兽', age: 18, address: '郑州市金水区'},
  {name: '格子白露版', nickname: '青雉', age: 23, address: '沈阳市和平区'},
  {name: '格子秋分版', nickname: '雪獒侠', age: 20, address: '青岛市市南区'},
  {name: '格子寒露版', nickname: '暴龙神', age: 22, address: '宁波市鄞州区'},
  {name: '格子霜降版', nickname: '飞天虎', age: 24, address: '合肥市蜀山区'},
  {name: '格子立冬版', nickname: '轰天雷', age: 19, address: '福州市鼓楼区'},
  {name: '格子小雪版', nickname: '急冻鸟', age: 21, address: '厦门市思明区'},
  {name: '格子大雪版', nickname: '幻影天王', age: 25, address: '济南市历下区'},
  {name: '格子冬至版', nickname: '闪电侠', age: 18, address: '大连市中山区'},
  {name: '格子小寒版', nickname: '冰封骑士', age: 23, address: '哈尔滨市道里区'},
  {name: '格子大寒版', nickname: '时光城主', age: 20, address: '昆明市五华区'}
]);

const handleAdd = () => {
  userFormModalRef.value.showModal({
    title: '新增用户',
    onSuccess: (data: UserInfo) => {
      dataSource.push(data)
    }
  })
}
const handleEdit = (index: number) => {
  userFormModalRef.value.showModal({
    title: '编辑用户',
    onSuccess: (data: UserInfo) => {
      dataSource.splice(index, 1, data)
    }
  })
}

const handleDel = (index: number) => {
  dataSource.splice(index, 1)
}
</script>
<template>
  <div class="m-10px">
    <div class="bg-white p-16px">
      <a-form layout="inline">
        <a-form-item label="姓名" name="username">
          <a-input placeholder="请输入" v-model:value="formState.username"/>
        </a-form-item>
        <a-form-item label="昵称" name="nickname">
          <a-input placeholder="请输入" v-model:value="formState.username"/>
        </a-form-item>
        <a-form-item>
          <a-button>
            <ReloadOutlined/>
            重置
          </a-button>
          <a-button class="ml-8px" type="primary">
            <SearchOutlined/>
            搜索
          </a-button>
        </a-form-item>
      </a-form>

    </div>
    <div class="my-16px p-16px bg-white">
      <div class="mb-16px">
        <a-button @click="handleAdd" type="primary">
          <PlusOutlined/>
          新增
        </a-button>
      </div>
      <a-table :data-source="dataSource" bordered :columns="columns">
        <template #bodyCell="{ column, index }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(index)">编辑</a-button>
            <a-button danger type="link" @click="handleDel(index)">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 新增用户 -->
    <UserFormModal ref="userFormModalRef"/>
  </div>
</template>