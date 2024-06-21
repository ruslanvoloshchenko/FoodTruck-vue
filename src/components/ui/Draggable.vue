<template>
  <div ref="draggable" 
    :class="isDraggable ? 'draggable border-shadow' : 'draggable'" 
    :key="id" 
    :style="{
      transform: `translate(${initPos.x}px, ${initPos.y}px)`,
      paddingLeft: isSold.value ? `0px` : `20px`,
      width: `${initSize.w}px`,
      height: `${initSize.h}px`,
    }" 
    :data-x="initPos.x" 
    :data-y="initPos.y">
    <div v-if="isSold.value" class="sold"></div>
    <div v-if="isDraggable" class="overlay">
      <button class="btn-red" @click="handleDelete">Delete</button>
      <button class="btn-red" @click="handleEdit">Edit</button>
      <button class="btn-red" @click="handleSold">Sold</button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, toRefs, computed } from 'vue';
import interact from 'interactjs';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  item: {
    type: Object,
    required: true
  },
  initSize: {
    type: Object,
    required: true
  },
  initPos: {
    type: Object,
    required: true
  },
  canResize: {
    type: Boolean,
    required: true
  },
  sold: {
    type: Boolean,
    required: true
  }
})

const draggable = ref(null);
const { canResize, sold, initPos, initSize, item } = toRefs(props);
const isDraggable = computed(() => store.state.isDraggable);
const isSold = computed(() => sold)

onMounted(() => {
  const ele = interact(draggable.value)
    .draggable({
      inertia: false,
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.snappers.grid({ x: 10, y: 10 })
          ],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ]
        }),
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
      autoScroll: true,
      listeners: {
        move(event) {
          if(!isDraggable.value) return
          const target = event.target;
          let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
          x = Math.floor(x / 10) * 10;
          y = Math.floor(y / 10) * 10;
          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          initPos.value.x = x
          initPos.value.y = y
        },
      },
    })
    if(canResize.value)
    ele.resizable({
      // resize from all edges and corners
      edges: { left: false, right: true, bottom: true, top: false },

      listeners: {
        move (event) {
          if(!isDraggable.value) return
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          var y = (parseFloat(target.getAttribute('data-y')) || 0)

          // update the element's style
          target.style.width = Math.floor(event.rect.width / 10) * 10 + 'px'
          target.style.height = Math.floor(event.rect.height / 10) * 10 + 'px'
          initSize.value.w = Math.floor(event.rect.width / 10) * 10 
          initSize.value.h = Math.floor(event.rect.height / 10) * 10 

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          x = Math.floor(x / 10) * 10;
          y = Math.floor(y / 10) * 10;

          target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
          
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)

          initPos.value.x = x
          initPos.value.y = y
        }
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 50, height: 50 }
        })
      ],

      inertia: false
    });
});

onUnmounted(() => {
  if (draggable.value) {
    interact(draggable.value).unset();
  }
});

const handleSold = () => {
  item.value.sold = item.value.sold == undefined ? false : !item.value.sold
}

const handleEdit = () => {
  store.dispatch('edit', { id: item.value.id, item })
}

const handleDelete = () => {
  store.dispatch('deleteFood', { id: item.value.id })
}

</script>

<style scoped>
.draggable {
  position: fixed;
  display: flex;
  min-width: 200px;
  min-height: 50px;
  padding: 1.2rem;
  color: black;
  cursor: pointer;
  user-select: none;
}

.draggable .overlay {
  position: absolute;
  top: -0.5rem;
}

.draggable .overlay button {
  padding: 0.1rem;
  margin-right: 0.1rem;
}

.border-shadow {
  border: 1px solid var(--color-border);
  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
}

.draggable .sold {
  min-width: 0.6rem;
  margin-right: 0.6rem;
  background-color: rgb(220, 70, 70);
  border-radius: 0.6rem;
}
</style>