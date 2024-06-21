<template>
  <header class="mt-1">
    <nav>
      <router-link to="/">Menu 1</router-link>
      <router-link to="/about">Menu 2</router-link>
      <router-link to="/Other">Menu 3</router-link>
    </nav>
    <div>
      <button class="btn-red mr-1" @click="handleSave">Save</button>
      <button class="btn-green mr-1" @click="showAddModal=true">Add</button>
      <button class="btn-blue" @click="showModal=true">Setting</button>
    </div>
  </header>
  <Modal :visible="showAddModal" @update:visible="showAddModal = $event">
    <div class="setting">
      <div><h1>Add New Items</h1></div>
      <div class="item">
        <div class="item-label">Title 1:</div>
        <div class="item-body"><input v-model="state.item.title1"/></div>
      </div>
      <div class="item">
        <div class="item-label">Title 2:</div>
        <div class="item-body"><input v-model="state.item.title2"/></div>
      </div>
      <div class="item">
        <div class="item-label">Subtitle:</div>
        <div class="item-body"><input v-model="state.item.subtitle"/></div>
      </div>
      <div class="item">
        <div class="item-label">Image:</div>
        <div class="item-body"><input v-model="state.item.img_name"/></div>
      </div>
      <hr />
      <div v-for="menu in state.item.submenu" 
        class="item"
        :key="menu.id"
      >
        <div class="item-label">Name:</div>
        <div class="item-body"><input v-model="menu.name"/></div>
        <div class="item-label">Price 1:</div>
        <div class="w-10 item-body"><input v-model="menu.price1"/></div>
        <div class="item-label">Price 2:</div>
        <div class="item-body w-10"><input v-model="menu.price2"/></div>
        <div class="item-label">Border:</div>
        <div><SliderBtn v-model="menu.border" /></div>
      </div>
      <div class="item">
        <button class="btn-blue m-auto w-40" @click="handleAddSubMenu">Add</button>
        <button class="btn-red m-auto w-40" @click="handleSaveSubMenu">Save</button>
      </div>
    </div>
  </Modal>
  <Modal :visible="showEditModal" @update:visible="showEditModal = $event">
    <div class="setting">
      <div><h1>Edit Item</h1></div>
      <div class="item">
        <div class="item-label">Title 1:</div>
        <div class="item-body"><input v-model="state.editItem.title1"/></div>
      </div>
      <div class="item">
        <div class="item-label">Title 2:</div>
        <div class="item-body"><input v-model="state.editItem.title2"/></div>
      </div>
      <div class="item">
        <div class="item-label">Subtitle:</div>
        <div class="item-body"><input v-model="state.editItem.subtitle"/></div>
      </div>
      <div class="item">
        <div class="item-label">Image:</div>
        <div class="item-body"><input v-model="state.editItem.img_name"/></div>
      </div>
      <hr />
      <div v-for="menu in state.editItem.submenu" 
        class="item"
        :key="menu.id"
      >
        <div class="item-label">Name:</div>
        <div class="item-body"><input v-model="menu.name"/></div>
        <div class="item-label">Price 1:</div>
        <div class="w-10 item-body"><input v-model="menu.price1"/></div>
        <div class="item-label">Price 2:</div>
        <div class="item-body w-10"><input v-model="menu.price2"/></div>
        <div class="item-label">Border:</div>
        <div><SliderBtn v-model="menu.border" /></div>
      </div>
      <div class="item">
        <button class="btn-blue m-auto w-40" @click="handleAddEditSubMenu">Add</button>
        <button class="btn-red m-auto w-40" @click="handleUpdateSubMenu">Update</button>
      </div>
    </div>
  </Modal>
  <Modal :visible="showModal" @update:visible="showModal = $event">
    <div class="setting">
      <div><h1>Settings</h1></div>
      <div class="item">
        <div class="w-40 item-label">Change theme</div>
        <div><SliderBtn v-model="isDark" /></div>
      </div>
      <div class="item">
        <div class="w-40 item-label">Draggable</div>
        <div><SliderBtn v-model="isDraggable" /></div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, watch, onMounted, computed, reactive } from 'vue'
import Modal from '../ui/Modal.vue';
import SliderBtn from '../ui/SliderBtn.vue';
import { useStore } from 'vuex';

const store = useStore();
const isDraggable = ref(store.getters.getDraggable)
const isEdit = computed(() => store.state.isEdit)
const showModal = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const isDark = ref(store.getters.getDark)

const state = reactive({
  item: {
    title1: "",
    title2: "",
    subtitle: "",
    type: "item",
    initPos: {
      x: 100,
      y: 100
    },
    initSize: {
      w: 200,
      h: 200
    },
    submenu: [],
    img_name: ""
  },
  editItem: {
    title1: "",
    title2: "",
    subtitle: "",
    type: "item",
    initPos: {
      x: 100,
      y: 100
    },
    initSize: {
      w: 200,
      h: 200
    },
    submenu: [],
    img_name: ""
  }
})
watch(isDraggable, () => {
  store.dispatch('setDraggable', isDraggable.value)
})

onMounted(() => {
  changeTheme(isDark.value)
})

const setBgColorDark = () => {
  document.body.style.setProperty('--color-background', 'var(--vt-c-black)')
  document.body.style.setProperty('--color-background-soft', 'var(--vt-c-black-soft)')
  document.body.style.setProperty('--color-background-mute', 'var(--vt-c-black-mute)')
  document.body.style.setProperty('--color-border', 'var(--vt-c-divider-dark-2)')
  document.body.style.setProperty('--color-border-hover', 'var(--vt-c-divider-dark-1)')
  document.body.style.setProperty('--color-heading', 'var(--vt-c-text-dark-1)')
  document.body.style.setProperty('--color-text', 'var(--vt-c-text-dark-2)')
}

const setBgColorLight = () => {
  document.body.style.setProperty('--color-background', 'var(--vt-c-white)')
  document.body.style.setProperty('--color-background-soft', 'var(--vt-c-white-soft)')
  document.body.style.setProperty('--color-background-mute', 'var(--vt-c-white-mute)')
  document.body.style.setProperty('--color-border', 'var(--vt-c-divider-light-2)')
  document.body.style.setProperty('--color-border-hover', 'var(--vt-c-divider-light-1)')
  document.body.style.setProperty('--color-heading', 'var(--vt-c-text-light-1)')
  document.body.style.setProperty('--color-text', 'var(--vt-c-text-light-2)')
}

const handleSave = () => {
  store.dispatch('save')
}

const changeTheme = (value) => {
  if (value) {
    setBgColorDark()
  } else {
    setBgColorLight()
  }
}

const handleAddSubMenu = () => {
  state.item.submenu.push({
    id: Date.now(),
    name: "",
    price1: "",
    price2: "",
    border: false
  })
}

const handleAddEditSubMenu = () => {
  state.editItem.submenu.push({
    id: Date.now(),
    name: "",
    price1: "",
    price2: "",
    border: false
  })
}

const handleSaveSubMenu = () => {
  store.dispatch('saveFood', { ...state.item, id: Date.now() })
}

const handleUpdateSubMenu = () => {
  store.dispatch('updateFood', { ...state.editItem })
}

watch(isEdit, () => {
  if(isEdit.value.id) {
    console.log(isEdit.value.item)
    showEditModal.value = true
    state.editItem = isEdit.value.item
  }
})

watch(isDark, changeTheme)
</script>

<style lang="sass" scoped>
.setting
  display: flex
  flex-direction: column
  h1
    text-align: center
  .item
    display: flex
    justify-content: space-between
    align-items: center
    margin: 0.5rem
    font-size: 1.2rem
    text-align: center
    .item-label
      width: 20%
    .item-body
      width: 80%
      input
        width: 100%
.mr-1
  margin-right: 1rem
.mt-1
  margin-top: 1rem
.m-auto
  margin: auto
.w-40
  width: 40%!important
.w-10
  width: 10%!important
.w-90
  width: 90%
header
  width: 100%
  padding-block: 1rem
  padding-inline: 1rem

  display: flex
  justify-content: space-between
  align-items: center
  nav
    display: flex
    justify-items: center
    align-items: center
    gap: 1rem
</style>
