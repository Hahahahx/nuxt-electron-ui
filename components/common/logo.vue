<template>
  <div class="h-28 w-38">
    <img class="h-full w-full hidden dark:block" :src="website.logo_dark">
    <img class="block h-full w-full dark:hidden" :src="website.logo_light">
  </div>
</template>
