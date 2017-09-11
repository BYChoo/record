<template>
  <div id="app">
  	<transition name="component-fade" mode="out-in">
    	<router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/font-awesome-4.7.0.min.css';
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
</style>
