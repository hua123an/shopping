<script setup>
import goodsItem from './goodsItem.vue'
import HomePanel from './HomePanel.vue'
import { findGoodsAPI } from '@/apis/home'
import { ref  , onMounted} from 'vue'
const goodsProduct = ref([])
const getGoods = async () => {
  const { result } = await findGoodsAPI()
  goodsProduct.value = result
}
onMounted( ()=> getGoods() )
</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-lazy-load="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="goods in cate.goods" :key="good.id">
         <goodsItem :goods="goods"/>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>