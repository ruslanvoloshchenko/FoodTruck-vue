<template>
  <div class="home">
    <Draggable 
      v-for="menu in menus"
      :key="menu.id"
      :id="menu.type=='logo' ? 'logo' : `item${menu.id}`"
      :canResize="true"
      :initPos="menu.initPos"
      :initSize="menu.initSize"
      :class="menu.type=='logo' ? 'logo' : ''"
      :sold="menu.sold"
      :item="menu"
      >
      <div v-if="menu.type=='logo'">
        <div>
          <img :src="logo" class="img"/>
        </div>
        <div class="label-menu">
          <span>= Menu =</span>
        </div>
        <div class="label-contact"> 
          <span>CALL US: </span><EditableInput :content="menu.phonenumber" />
        </div>
      </div>
      <div v-if="menu.type=='item'" class="item">
        <div>
          <EditableInput class="title1" :content="menu.title1" />&nbsp;
          <EditableInput class="title2" :content="menu.title2" />&nbsp;
          <EditableInput class="subtitle" 
            v-if="menu.subtitle" :content="`(${menu.subtitle})`" />
        </div>
        <div class="subitem">
          <div class="body">
            <div 
              v-for="submenu in menu.submenu"
              :key="`subitem-${menu.id}-${submenu.id}`"
              >
              <div class="content">
                <EditableInput :content="submenu.name" />
                <div>
                  $<EditableInput :content="submenu.price1" />
                  <span v-if="submenu.price2">/ $</span>
                  <EditableInput v-if="submenu.price2" :content="submenu.price2" />
                </div>
              </div>
              <div v-if="submenu.border" class="dotted-border"></div>
            </div>
          </div>
          <div v-if="menu.img_name" class="img">
            <img :src="logo"/>
          </div>
        </div>
      </div>
    </Draggable>
  </div>
</template>

<style lang="sass" scoped>
.home
  display: flex
  height: 80vh
  gap: 1rem
  .item
    display: flex
    flex-direction: column
    width: 100%
    .content
      display: flex
      justify-content: space-between
    .title1
      color: #de6744
      font-weight: 700
      font-size: 2rem
    .title2
      color: black
      font-weight: 700
      font-size: 2rem
    .subtitle
      color: black
      font-weight: 700
      font-size: 1rem
    .subitem
      display: flex
      justify-content: space-between
      width: 100%
      .body
        width: 100%
      .img
        width: 50%
        position: relative
        top: -1rem
        display: flex
        justify-content: right
        align-items: center
        img
          width: 70%
        
  .logo
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    background-color: rgb(15, 15, 15)
    .label-menu
      text-align: center
      span
        color: rgb(215, 50, 40)
        font-size: 2rem
        font-weight: 700
    .label-contact
      margin-bottom: 2rem
      text-align: center
      span
        color: white
        font-size: 1rem
    img
      width: 15rem
      height: 15rem
      margin: 0 3rem
</style>

<script setup>
import Draggable from '@/components/ui/Draggable.vue';
import logo from '@/assets/logo.png'
import EditableInput from '@/components/ui/EditableInput.vue'
import { watch, computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const foods = computed(() => store.state.foods)

const menus = ref(foods.value)

watch(foods, () => {
  menus.value = foods.value
})
</script>

<style>
.dotted-border {
  width: 80%;
  border-bottom: 3px dotted #333; /* Dotted left border */
  background-color: #f0f0f0; /* Background color */
  color: #333; /* Text color */
  font-size: 0.5rem; /* Font size */
}
</style>