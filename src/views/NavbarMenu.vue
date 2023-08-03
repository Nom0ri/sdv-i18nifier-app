<template>
    <nav class="navbar">
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <router-link
              :to="{ name: 'HomePage' }"
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-500 dark:hover:text-gray-300;"
              active-class="text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500;"
            >
              Home
            </router-link>
          </li>
          <li class="mr-2">
            <router-link
              :to="{ name: 'Dialogues' }"
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-blue-500 dark:hover:text-gray-300;"
              active-class="text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500;"
            >
              Dialogues
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavbarMenu",
  };
  </script>
  