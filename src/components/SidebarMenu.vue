<template>
    <div class="sidebar">
        <div class="flex flex-col items-center w-40 h-full overflow-hidden text-gray-400 bg-gray-900 rounded full">
            <router-link :to="{ name: 'HomePage' }" class="flex items-center w-full px-3 mt-3">
                <svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <span class="ml-2 text-sm font-bold">SDV i18nifier</span>
            </router-link>

            <div class="w-full px-2">
                <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                    <router-link :to="{ name: 'HomePage' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="ml-2 text-sm font-medium">Home</span>
                    </router-link>
                    <router-link :to="{ name: 'Dialogues' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <img class="w-6 h-6 stroke-current" src="../assets/convert-icon.svg"/>
                        <span class="ml-2 text-sm font-medium">Dialogues</span>
                    </router-link>
                    <router-link :to="{ name: 'Events' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <img class="w-6 h-6 stroke-current" src="../assets/convert-icon.svg"/>
                        <span class="ml-2 text-sm font-medium">Events</span>
                    </router-link>
                    <router-link :to="{ name: 'Quests' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <img class="w-6 h-6 stroke-current" src="../assets/convert-icon.svg"/>
                        <span class="ml-2 text-sm font-medium">Quests</span>
                    </router-link>
                    <router-link :to="{ name: 'Movies' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <img class="w-6 h-6 stroke-current" src="../assets/convert-icon.svg"/>
                        <span class="ml-2 text-sm font-medium">Movies</span>
                    </router-link>
                    <router-link :to="{ name: 'Objects' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <img class="w-6 h-6 stroke-current" src="../assets/convert-icon.svg"/>
                        <span class="ml-2 text-sm font-medium">Objects</span>
                    </router-link>
                    <router-link :to="{ name: 'Recipes' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <img class="w-6 h-6 stroke-current" src="../assets/convert-icon.svg"/>
                        <span class="ml-2 text-sm font-medium">Recipes</span>
                    </router-link>
                    <router-link :to="{ name: 'Config' }"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <img class="w-6 h-6 stroke-current" src="../assets/convert-icon.svg"/>
                        <span class="ml-2 text-sm font-medium">Config</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
  