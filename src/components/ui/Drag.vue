<template>
    <div ref="draggable" class="draggable">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import interact from 'interactjs';
  
  const draggable = ref(null);
  
  onMounted(() => {
    interact(draggable.value)
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true,
          }),
        ],
        autoScroll: true,
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
        },
      });
  });
  
  onUnmounted(() => {
    if (draggable.value) {
      interact(draggable.value).unset();
    }
  });
  </script>
  
  <style scoped>
  .draggable {
    width: 50px;
    height: 50px;
    background-color: #29e;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  </style>
  