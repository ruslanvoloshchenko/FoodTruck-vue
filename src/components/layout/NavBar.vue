<template>
  <header :class="state.isPreview == 1 ? 'mt-1 hidden' : 'mt-1'">
    <nav>
      <router-link v-for="menu in menus" :to="`/?id=${menu}`">
        <span :class="state.selMenu == menu ? 'active' : ''">{{ menu }}</span>
      </router-link>
    </nav>
    <div>
      <button class="btn-blue mr-1" @click="handlePublish">Publish</button>
      <button v-if="isDraggable" class="btn-red mr-1" @click="handleSave">Save</button>
      <button v-if="isDraggable" class="btn-green mr-1" @click="showAddModal=true">Add</button>
      <button class="btn-blue" @click="showModal=true">Setting</button>
    </div>
  </header>
  <div :style="{ marginTop: state.isPreview == 1 ? '3rem' : '0rem'}"></div>
  <Modal :visible="showAddModal" @update:visible="showAddModal = $event">
    <div class="setting">
      <div><h1>Add New Items</h1></div>
      <div class="item">
        <div class="item-label">Type:</div>
        <div class="item-body">
          <select v-model="state.item.type" @change="handleChangeType">
            <option value="social">Social</option>
            <option value="item">Food</option>
            <option value="logo">Logo</option>
            <option value="banner">Banner</option>
            <option value="marquee">Marquee</option>
            <option value="image">Image</option>
            <option value="menu">Menu</option>
          </select>
        </div>
      </div>
      <div v-if="state.item.type != 'menu'">
        <div v-if="state.item.type == 'image'" class="item">
          <div class="item-label">Image File:</div>
          <div class="item-body"><ImageUpload :filename="state.item.img_name"/></div>
        </div>

        <!-- Banner Start -->
        <div v-if="state.item.type == 'banner'" class="item">
          <div class="item-label">Banner:</div>
          <div class="item-body"><input v-model="state.item.banner.content"/></div>
        </div>
        <div v-if="state.item.type == 'banner'" class="item">
          <div class="item-label">Font Size:</div>
          <div class="item-body"><input v-model="state.item.banner.fontSize"/></div>
        </div>
        <div v-if="state.item.type == 'banner'" class="item">
          <div class="item-label">Font Weight:</div>
          <div class="item-body"><input v-model="state.item.banner.fontWeight"/></div>
        </div>
        <div v-if="state.item.type == 'banner'" class="item">
          <div class="item-label">Font Family:</div>
          <div class="item-body"><input v-model="state.item.banner.fontFamily"/></div>
        </div>
        <div v-if="state.item.type == 'banner'" class="item">
          <div class="item-label">Font Color:</div>
          <div class="item-body"><input v-model="state.item.banner.fontColor"/></div>
        </div>
        <!-- Banner End -->
      
        <!-- Marquee Start -->
        <div v-if="state.item.type == 'marquee'" class="item">
          <div class="item-label">Content:</div>
          <div class="item-body"><input v-model="state.item.marquee.content"/></div>
        </div>
        <div v-if="state.item.type == 'marquee'" class="item">
          <div class="item-label">Font Size:</div>
          <div class="item-body"><input v-model="state.item.marquee.fontSize"/></div>
        </div>
        <div v-if="state.item.type == 'marquee'" class="item">
          <div class="item-label">Font Weight:</div>
          <div class="item-body"><input v-model="state.item.marquee.fontWeight"/></div>
        </div>
        <div v-if="state.item.type == 'marquee'" class="item">
          <div class="item-label">Font Family:</div>
          <div class="item-body"><input v-model="state.item.marquee.fontFamily"/></div>
        </div>
        <div v-if="state.item.type == 'marquee'" class="item">
          <div class="item-label">Font Color:</div>
          <div class="item-body"><input v-model="state.item.marquee.fontColor"/></div>
        </div>
        <!-- Marquee End -->

        <div v-if="state.item.type == 'logo'" class="item">
          <div class="item-label">Contact:</div>
          <div class="item-body"><input v-model="state.item.phonenumber"/></div>
        </div>

        <div v-if="state.item.type == 'item'" class="item">
          <div class="item-label">Title 1:</div>
          <div class="item-body"><input v-model="state.item.title1"/></div>
        </div>
        <div v-if="state.item.type == 'item'" class="item">
          <div class="item-label">Title 2:</div>
          <div class="item-body"><input v-model="state.item.title2"/></div>
        </div>
        <div v-if="state.item.type == 'item'" class="item">
          <div class="item-label">Subtitle:</div>
          <div class="item-body"><input v-model="state.item.subtitle"/></div>
        </div>
        <!-- <div v-if="state.item.type == 'item'" class="item">
          <div class="item-label">Image:</div>
          <div class="item-body"><input v-model="state.item.img_name.url"/></div>
        </div> -->
        <hr />
        
        <div v-if="state.item.type == 'item'" v-for="menu in state.item.submenu" 
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

        <!-- Social Info Start -->
        <div v-if="state.item.type == 'social'" class="item">
          <div class="item-label">Gmail:</div>
          <div class="item-body"><input v-model="state.item.social.gmail"/></div>
        </div>
        <div v-if="state.item.type == 'social'" class="item">
          <div class="item-label">Facebook:</div>
          <div class="item-body"><input v-model="state.item.social.facebook"/></div>
        </div>
        <div v-if="state.item.type == 'social'" class="item">
          <div class="item-label">Instagram:</div>
          <div class="item-body"><input v-model="state.item.social.instagram"/></div>
        </div>
        <div v-if="state.item.type == 'social'" class="item">
          <div class="item-label">TikTok:</div>
          <div class="item-body"><input v-model="state.item.social.tiktok"/></div>
        </div>
        <div v-if="state.item.type == 'social'" class="item">
          <div class="item-label">Cell:</div>
          <div class="item-body"><input v-model="state.item.social.cell"/></div>
        </div>
        <!-- Social Info End -->
        <div class="item">
          <div class="item-label">Background color:</div>
          <div class="item-body"><input v-model="state.item.bgcolor"/></div>
        </div>
        <div class="item">
          <button v-if="state.item.type == 'item'" class="btn-blue m-auto w-40" @click="handleAddSubMenu">Add</button>
          <button class="btn-red m-auto w-40" @click="handleSaveSubMenu">Save</button>
        </div>
      </div>
      <div v-else class="menus">
        <div v-for="menu in menus" :key="menu">
          <input :placeholder="menu"/>
          <button class="btn-red" @click="() => { handleDeleteMenu(menu) }">Delete</button>
        </div>
        <div>
          <input v-model="state.menu"/>
          <button class="btn-blue" @click="handleAddNewMenu">Add</button>
        </div>
      </div>
    </div>
  </Modal>
  <Modal :visible="showEditModal" @update:visible="showEditModal = $event">
    <div class="setting">
      <div><h1>Edit Item</h1></div>
      <!-- Banner Start -->
      <div v-if="state.editItem.type == 'banner'" class="item">
        <div class="item-label">Banner:</div>
        <div class="item-body"><input v-model="state.editItem.banner.content"/></div>
      </div>
      <div v-if="state.editItem.type == 'banner'" class="item">
        <div class="item-label">Font Size:</div>
        <div class="item-body"><input v-model="state.editItem.banner.fontSize"/></div>
      </div>
      <div v-if="state.editItem.type == 'banner'" class="item">
        <div class="item-label">Font Weight:</div>
        <div class="item-body"><input v-model="state.editItem.banner.fontWeight"/></div>
      </div>
      <div v-if="state.editItem.type == 'banner'" class="item">
        <div class="item-label">Font Family:</div>
        <div class="item-body"><input v-model="state.editItem.banner.fontFamily"/></div>
      </div>
      <div v-if="state.editItem.type == 'banner'" class="item">
        <div class="item-label">Font Color:</div>
        <div class="item-body"><input v-model="state.editItem.banner.fontColor"/></div>
      </div>
      <!-- Banner End -->

      <!-- Marquee Start -->
      <div v-if="state.editItem.type == 'marquee'" class="item">
        <div class="item-label">Marquee:</div>
        <div class="item-body"><input v-model="state.editItem.marquee.content"/></div>
      </div>
      <div v-if="state.editItem.type == 'marquee'" class="item">
        <div class="item-label">Font Size:</div>
        <div class="item-body"><input v-model="state.editItem.marquee.fontSize"/></div>
      </div>
      <div v-if="state.editItem.type == 'marquee'" class="item">
        <div class="item-label">Font Weight:</div>
        <div class="item-body"><input v-model="state.editItem.marquee.fontWeight"/></div>
      </div>
      <div v-if="state.editItem.type == 'marquee'" class="item">
        <div class="item-label">Font Family:</div>
        <div class="item-body"><input v-model="state.editItem.marquee.fontFamily"/></div>
      </div>
      <div v-if="state.editItem.type == 'marquee'" class="item">
        <div class="item-label">Font Color:</div>
        <div class="item-body"><input v-model="state.editItem.marquee.fontColor"/></div>
      </div>
      <!-- Marquee End -->

      <div v-if="state.editItem.type == 'item'" class="item">
        <div class="item-label">Title 1:</div>
        <div class="item-body"><input v-model="state.editItem.title1"/></div>
      </div>
      <div v-if="state.editItem.type == 'item'" class="item">
        <div class="item-label">Title 2:</div>
        <div class="item-body"><input v-model="state.editItem.title2"/></div>
      </div>
      <div v-if="state.editItem.type == 'item'" class="item">
        <div class="item-label">Subtitle:</div>
        <div class="item-body"><input v-model="state.editItem.subtitle"/></div>
      </div>
      <!-- <div v-if="state.editItem.type == 'item'" class="item">
        <div class="item-label">Image:</div>
        <div class="item-body"><input v-model="state.editItem.img_name"/></div>
      </div> -->
      <div v-if="state.editItem.type == 'logo'" class="item">
        <div class="item-label">Contact:</div>
        <div class="item-body"><input v-model="state.editItem.phonenumber"/></div>
      </div>
      <hr />
      <div v-if="state.editItem.type == 'item'" v-for="menu in state.editItem.submenu" 
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
      <!-- Social Info Start -->
      <div v-if="state.editItem.type == 'social'" class="item">
        <div class="item-label">Gmail:</div>
        <div class="item-body"><input v-model="state.editItem.social.gmail"/></div>
      </div>
      <div v-if="state.editItem.type == 'social'" class="item">
        <div class="item-label">Facebook:</div>
        <div class="item-body"><input v-model="state.editItem.social.facebook"/></div>
      </div>
      <div v-if="state.editItem.type == 'social'" class="item">
        <div class="item-label">Instagram:</div>
        <div class="item-body"><input v-model="state.editItem.social.instagram"/></div>
      </div>
      <div v-if="state.editItem.type == 'social'" class="item">
        <div class="item-label">TikTok:</div>
        <div class="item-body"><input v-model="state.editItem.social.tiktok"/></div>
      </div>
      <div v-if="state.editItem.type == 'social'" class="item">
        <div class="item-label">Cell:</div>
        <div class="item-body"><input v-model="state.editItem.social.phone"/></div>
      </div>
      <!-- Social Info End -->
      <div class="item">
        <div class="item-label">Background color:</div>
        <div class="item-body"><input v-model="state.editItem.bgcolor"/></div>
      </div>
      <div class="item">
        <button v-if="state.editItem.type == 'item'" class="btn-blue m-auto w-40" @click="handleAddEditSubMenu">Add</button>
        <button class="btn-red m-auto w-40" @click="handleUpdateSubMenu">Update</button>
      </div>
    </div>
  </Modal>
  <Modal :visible="showModal" @update:visible="showModal = $event">
    <div class="setting">
      <div><h1>Settings</h1></div>
      <!-- <div class="item">
        <div class="w-40 item-label">Change theme</div>
        <div><SliderBtn v-model="isDark" /></div>
      </div> -->
      <div class="item">
        <div class="w-40 item-label">Enable to Edit(Preview)</div>
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
import ImageUpload from '../ui/ImageUpload.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore();
const isDraggable = ref(store.getters.getDraggable)
const menus = computed(() => store.state.menus)
const isEdit = computed(() => store.state.isEdit)
const showModal = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const isDark = ref(store.getters.getDark)

const selMenu = computed(() => {
  return router.currentRoute.value.query.id
})

const isPreview = computed(() => {
  return router.currentRoute.value.query.ispreview || 0
})

const initialValue = {
  isPreview: 0,
  selMenu: "",
  menu: "",
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
    img_name: {},
    phonenumber: "",
    social: {},
    banner: {},
    marquee: {}
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
    img_name: {},
    social: {},
    banner: {},
    marquee: {}
  }
}

const state = reactive(initialValue)

watch(isDraggable, () => {
  store.dispatch('setDraggable', isDraggable.value)
})

onMounted(() => {
  changeTheme(isDark.value)
  store.dispatch('getMenus')
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

const handleAddNewMenu = () => {
  store.dispatch('addMenu', { ...state.menu })
}

const handleSaveSubMenu = () => {
  store.dispatch('saveFood', { ...state.item, id: Date.now(), callback: () => {
    alert()
    state.item = {
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
      img_name: {},
      phonenumber: "",
      social: {},
      banner: {},
      marquee: {}
    }
  } })
}

const handleUpdateSubMenu = () => {
  store.dispatch('updateFood', { ...state.editItem })
}

const handleChangeType = (e) => {
}

const handleDeleteMenu = (menu) => {
  store.dispatch('deleteMenu', menu)
}

const handlePublish = () => {
  router.push(`/?id=${selMenu.value}&ispreview=1`)
}

watch(isEdit, () => {
  if(isEdit.value.id) {
    showEditModal.value = true
    state.editItem = isEdit.value.item
  }
})

watch(selMenu, () => {
  store.dispatch('changeSelMenu', selMenu.value)
  state.selMenu = selMenu.value
})

watch(isDark, changeTheme)

watch(isPreview, () => {
  if(isPreview.value == 1) {
    state.isPreview = 1
    store.dispatch('setDraggable', false)
  }
})
</script>

<style lang="sass" scoped>
.hidden
  display: none
.setting
  display: flex
  flex-direction: column
  .menus
    display: flex
    flex-direction: column
    input
      width: 50%
      margin: 1rem
    button
      width: 20%
      margin: 1rem
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
    select
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
    .active
      color: red

</style>
