import { postModifyCartNum } from "@/api/cart";

const state = {
  // 购入车列表
  cartList: [],
};
const mutations = {
  // 添加购物车
  addToCart(state, payload) {
    state.cartList.push(payload);
  },
  // 清除购物车
  clearCart(state) {
    state.cartList = [];
  },
  // 商品状态修改
  checkedChange(state, { id, checked }) {
    state.cartList.find((item) => item.id === id).checked = checked;
  },
  // 商品数量修改
  countChange(state, { id, count }) {
    state.cartList.find((item) => item.id === id).count = count;
  },
  // 全选
  checkedAll(state, { checked }) {
    state.cartList.forEach((item) => (item.checked = checked));
  },
};
const getters = {
  // 筛选选中的选项
  checkedItem: (state) => {
    return state.cartList.filter((item) => item.checked === true);
  },
  // 计算价格
  totalPrice: (state, getters) => {
    return getters.checkedItem
      .reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0)
      .toFixed(2);
  },
  // 全选
  checkedAll: (state, getter) => {
    return state.cartList.length === getter.checkedItem.length;
  },
};
const actions = {
  async countChange({ commit }, payload) {
    commit("countChange", payload);
    // 发送商品请求
    const { data } = await postModifyCartNum({
      id: payload.id,
      number: payload.count,
    });
    if (data.status !== 200) return;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
